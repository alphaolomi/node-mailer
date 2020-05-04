import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export const ETHEREAL_HOST = process.env.ETHEREAL_HOST
export const ETHEREAL_PORT = process.env.ETHEREAL_PORT
export const ETHEREAL_SECURITY = process.env.ETHEREAL_SECURITY
export const ETHEREAL_USERNAME = process.env.ETHEREAL_USERNAME
export const ETHEREAL_PASSWORD = process.env.ETHEREAL_PASSWORD
