import express from "express";
import { ENVIRONMENT, PORT } from "./utils/envManager.js";
import { logEnvironment } from "./utils/environmentLogger.js";

const app = express();

logEnvironment(ENVIRONMENT);

// Routes
app.get("/", (req, res) => {
	console.log("Request received");
	res.send("Hello World");
});

// Server
app.listen(PORT, () => {
	console.log(" Server is running on port:", PORT, "in", ENVIRONMENT, "MODE");
});
