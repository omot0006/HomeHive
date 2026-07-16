const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const { env, validateEnvironment } = require("../src/config/env");
const { connectDatabase, disconnectDatabase } = require("../src/config/database");
const User = require("../src/models/User");

const request = async (baseUrl, path, options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  return { response, body: await response.json() };
};

const run = async () => {
  validateEnvironment();
  await connectDatabase();

  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}/api`;
  const email = `auth-smoke-${Date.now()}@example.com`;
  const noNicknameEmail = `auth-smoke-no-nickname-${Date.now()}@example.com`;
  const password = "SmokeTest123!";

  try {
    const registration = await request(baseUrl, "/auth/register", {
      method: "POST",
      headers: { Origin: "http://127.0.0.1:5173" },
      body: JSON.stringify({ firstName: "Auth", lastName: "Smoke", nickname: "  Auth Bee  ", email: email.toUpperCase(), password }),
    });
    assert.equal(registration.response.status, 201);
    assert.ok(registration.body.data.token);
    assert.equal(registration.body.data.user.email, email);
    assert.equal(registration.body.data.user.nickname, "Auth Bee");
    assert.equal("password" in registration.body.data.user, false);
    assert.equal(registration.response.headers.get("access-control-allow-origin"), "http://127.0.0.1:5173");

    const storedUser = await User.findOne({ email }).select("+password");
    assert.ok(storedUser);
    assert.notEqual(storedUser.password, password);
    assert.equal(storedUser.nickname, "Auth Bee");
    assert.equal(await storedUser.comparePassword(password), true);

    const duplicate = await request(baseUrl, "/auth/register", {
      method: "POST",
      headers: { Origin: "http://localhost:5173" },
      body: JSON.stringify({ firstName: "Auth", lastName: "Duplicate", email, password }),
    });
    assert.equal(duplicate.response.status, 409);

    const login = await request(baseUrl, "/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    assert.equal(login.response.status, 200);
    assert.ok(login.body.data.token);
    assert.equal(login.body.data.user.nickname, "Auth Bee");
    assert.equal("password" in login.body.data.user, false);

    const incorrectPassword = await request(baseUrl, "/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password: "Incorrect123!" }),
    });
    assert.equal(incorrectPassword.response.status, 401);

    const me = await request(baseUrl, "/auth/me", {
      headers: { Authorization: `Bearer ${login.body.data.token}` },
    });
    assert.equal(me.response.status, 200);
    assert.equal(me.body.data.user.email, email);
    assert.equal(me.body.data.user.nickname, "Auth Bee");
    assert.equal("password" in me.body.data.user, false);

    const update = await request(baseUrl, "/auth/me", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${login.body.data.token}` },
      body: JSON.stringify({ nickname: "  Bee Prime  " }),
    });
    assert.equal(update.response.status, 200);
    assert.equal(update.body.data.user.nickname, "Bee Prime");
    assert.equal("password" in update.body.data.user, false);

    const refreshedMe = await request(baseUrl, "/auth/me", {
      headers: { Authorization: `Bearer ${login.body.data.token}` },
    });
    assert.equal(refreshedMe.body.data.user.nickname, "Bee Prime");

    const withoutNickname = await request(baseUrl, "/auth/register", {
      method: "POST",
      body: JSON.stringify({ firstName: "Fallback", lastName: "User", email: noNicknameEmail, password }),
    });
    assert.equal(withoutNickname.response.status, 201);
    assert.equal(withoutNickname.body.data.user.nickname, "");
    assert.equal("password" in withoutNickname.body.data.user, false);
    const storedWithoutNickname = await User.findOne({ email: noNicknameEmail });
    assert.equal(storedWithoutNickname.nickname, "");

    const missingFields = await request(baseUrl, "/auth/register", {
      method: "POST",
      body: JSON.stringify({ email: "invalid", password: "short" }),
    });
    assert.equal(missingFields.response.status, 400);
    assert.ok(missingFields.body.error.details.firstName);
    assert.ok(missingFields.body.error.details.lastName);
    assert.ok(missingFields.body.error.details.email);
    assert.ok(missingFields.body.error.details.password);

    const invalidToken = await request(baseUrl, "/auth/me", {
      headers: { Authorization: "Bearer invalid-token" },
    });
    assert.equal(invalidToken.response.status, 401);

    const expiredToken = jwt.sign({}, env.jwtSecret, { subject: registration.body.data.user._id, expiresIn: -1 });
    const expired = await request(baseUrl, "/auth/me", {
      headers: { Authorization: `Bearer ${expiredToken}` },
    });
    assert.equal(expired.response.status, 401);
    assert.equal(expired.body.error.message, "Authentication token has expired.");

    console.log("Authentication smoke tests passed, including nickname registration, persistence, update, and refresh.");
  } finally {
    await User.deleteMany({ email: { $in: [email, noNicknameEmail] } });
    await new Promise((resolve) => server.close(resolve));
    await disconnectDatabase();
  }
};

run().catch((error) => {
  console.error("Authentication smoke tests failed:", error.message);
  process.exitCode = 1;
});
