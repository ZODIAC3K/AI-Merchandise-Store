import express from "express";
import { ENVIRONMENT, PORT } from "./config/index.js";
import { logEnvironment } from "./utils/environmentLogger.js";

const app = express();

logEnvironment(ENVIRONMENT);

// Routes
app.get("/", (req, res) => {
	res.send("Hello World");
});

// Server
app.listen(PORT, () => {
	console.log(
		" Server is running on port:",
		PORT,
		"in",
		ENVIRONMENT.toUpperCase(),
		"MODE"
	);
});
