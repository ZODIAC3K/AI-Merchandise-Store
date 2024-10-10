import express from "express";
import { ENVIRONMENT, PORT } from "./utils/envManager.js";
import { logEnvironment } from "./utils/environmentLogger.js";
import routes from "./routes/index.js";

const app = express();

logEnvironment(ENVIRONMENT);

// Middleware
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);

// Routes
app.use(routes);

// Server
app.listen(PORT, () => {
	console.log(" Server is running on port:", PORT, "in", ENVIRONMENT, "MODE");
});
