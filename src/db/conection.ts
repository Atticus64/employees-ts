import dotenv from "dotenv";
import mongoose from "mongoose";
import { z } from "zod";

const envVariables = z.object({
	DATABASE_URL: z.string(),
});

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envVariables> { }
	}
}

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
