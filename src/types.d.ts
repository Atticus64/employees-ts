import { envVariables } from "./db/conection";
import { z } from 'zod'


declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envVariables> {
			foo: string
		}
	}
}