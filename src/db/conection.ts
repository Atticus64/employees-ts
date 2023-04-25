import mongoose from 'mongoose'
import { z } from 'zod'
import dotenv from 'dotenv'

const envVariables = z.object({
  DATABASE_URL: z.string(),
})

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends z.infer<typeof envVariables> { }
  }
}

export async function connectDB() {
  try {
    dotenv.config()
    await mongoose.connect(process.env.DATABASE_URL)
  } catch (error) {
    console.log(error)
  }
}
