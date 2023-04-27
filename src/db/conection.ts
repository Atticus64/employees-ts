import dotenv from "dotenv";
import mongoose from "mongoose";
import { z } from "zod";

export const envVariables = z.object({
	DATABASE_URL: z.string(),
});

/**
 * Connects to Database
 */
export async function connectDB() {
	try {
		dotenv.config();
		await mongoose.connect(process.env.DATABASE_URL ?? '');
	} catch (error) {
		throw new Error(error as string);
	}
}
