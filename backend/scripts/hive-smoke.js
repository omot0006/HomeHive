const assert = require("node:assert/strict");
const app = require("../src/app");
const { validateEnvironment } = require("../src/config/env");
const { connectDatabase, disconnectDatabase } = require("../src/config/database");
const Hive = require("../src/models/Hive");
const User = require("../src/models/User");

const request = async (baseUrl, path, options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  return { response, body: await response.json() };
};

const register = async (baseUrl, details) => {
  const result = await request(baseUrl, "/auth/register", {
    method: "POST",
    body: JSON.stringify(details),
  });
  assert.equal(result.response.status, 201);
  return result.body.data;
};

const run = async () => {
  validateEnvironment();
  await connectDatabase();
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));

  const baseUrl = `http://127.0.0.1:${server.address().port}/api`;
  const stamp = Date.now();
  const ownerEmail = `hive-owner-${stamp}@example.com`;
  const memberEmail = `hive-member-${stamp}@example.com`;
  const password = "HiveSmoke123!";
  let hiveId;

  try {
    const unauthenticated = await request(baseUrl, "/hives/me");
    assert.equal(unauthenticated.response.status, 401);

    const owner = await register(baseUrl, { firstName: "Hive", lastName: "Owner", nickname: "Captain", email: ownerEmail, password });
    const member = await register(baseUrl, { firstName: "Hive", lastName: "Member", email: memberEmail, password });

    const created = await request(baseUrl, "/hives", {
      method: "POST",
      headers: { Authorization: `Bearer ${owner.token}` },
      body: JSON.stringify({ name: "Smoke House", description: "Integration test Hive", householdType: "Roommates" }),
    });
    assert.equal(created.response.status, 201);
    assert.match(created.body.data.hive.inviteCode, /^[A-Z0-9]{6}$/);
    assert.equal(created.body.data.hive.members.length, 1);
    assert.equal(created.body.data.hive.members[0].role, "owner");
    assert.equal(created.body.data.user.hiveId, created.body.data.hive._id);
    hiveId = created.body.data.hive._id;

    const secondCreate = await request(baseUrl, "/hives", {
      method: "POST",
      headers: { Authorization: `Bearer ${owner.token}` },
      body: JSON.stringify({ name: "Second House", householdType: "Family" }),
    });
    assert.equal(secondCreate.response.status, 409);

    const storedHive = await Hive.findById(hiveId);
    assert.ok(storedHive);
    assert.equal(storedHive.owner.toString(), owner.user._id);
    assert.equal(storedHive.members[0].user.toString(), owner.user._id);
    assert.equal((await User.findById(owner.user._id)).hiveId.toString(), hiveId);

    const ownerSession = await request(baseUrl, "/auth/me", { headers: { Authorization: `Bearer ${owner.token}` } });
    assert.equal(ownerSession.response.status, 200);
    assert.equal(ownerSession.body.data.user.hiveId, hiveId);

    const mine = await request(baseUrl, "/hives/me", { headers: { Authorization: `Bearer ${owner.token}` } });
    assert.equal(mine.response.status, 200);
    assert.equal(mine.body.data.hive.name, "Smoke House");

    const invalid = await request(baseUrl, "/hives/join", {
      method: "POST",
      headers: { Authorization: `Bearer ${member.token}` },
      body: JSON.stringify({ inviteCode: "BAD999" }),
    });
    assert.equal(invalid.response.status, 404);

    const joined = await request(baseUrl, "/hives/join", {
      method: "POST",
      headers: { Authorization: `Bearer ${member.token}` },
      body: JSON.stringify({ inviteCode: created.body.data.hive.inviteCode.toLowerCase() }),
    });
    assert.equal(joined.response.status, 200);
    assert.equal(joined.body.data.hive.members.length, 2);
    assert.equal(joined.body.data.hive.members[1].role, "member");
    assert.equal(joined.body.data.user.hiveId, hiveId);

    const memberSession = await request(baseUrl, "/auth/me", { headers: { Authorization: `Bearer ${member.token}` } });
    assert.equal(memberSession.response.status, 200);
    assert.equal(memberSession.body.data.user.hiveId, hiveId);

    const duplicate = await request(baseUrl, "/hives/join", {
      method: "POST",
      headers: { Authorization: `Bearer ${member.token}` },
      body: JSON.stringify({ inviteCode: created.body.data.hive.inviteCode }),
    });
    assert.equal(duplicate.response.status, 409);

    console.log("Hive smoke tests passed: create, persistence, owner membership, lookup, invalid join, join, and duplicate prevention.");
  } finally {
    if (hiveId) await Hive.deleteOne({ _id: hiveId });
    await User.deleteMany({ email: { $in: [ownerEmail, memberEmail] } });
    await new Promise((resolve) => server.close(resolve));
    await disconnectDatabase();
  }
};

run().catch((error) => {
  console.error("Hive smoke tests failed:", error.message);
  process.exitCode = 1;
});
