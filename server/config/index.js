import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

export const ENVIRONMENT = process.env.NODE_ENV;
export const PORT = process.env.PORT;
