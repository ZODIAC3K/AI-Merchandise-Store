import dotenv from "dotenv";

// I'm implementing a strategy to streamline environment management for my full-stack application by separating configurations into two `.env` files based on their roles. The main `.env` file, located in the root directory, will handle high-level environment variables like `SERVER_PORT` and `SERVER_NODE_ENV`, ensuring that infrastructure settings such as Docker orchestration and port allocation are consistent across different environments (development, production, etc.). For more granular, component-specific settings, such as local API keys or database credentials, I'll use a `.env.local` file. This approach allows developers working on specific parts of the application to focus on their services without needing to run the entire stack, improving efficiency and flexibility. It also simplifies collaboration by isolating global infrastructure settings from local development configurations, making development and testing easier and more modular.

if (!process.env.SERVER_NODE_ENV || !process.env.SERVER_PORT) {
	dotenv.config({ path: ".env" });
}

export const ENVIRONMENT = process.env.SERVER_NODE_ENV;
export const PORT = process.env.SERVER_PORT;
