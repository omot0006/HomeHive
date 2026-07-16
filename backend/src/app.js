const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/cors");
const apiRoutes = require("./routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

