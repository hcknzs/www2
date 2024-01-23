import { createEnv } from "@t3-oss/env-core";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: ".vercel/.env.development.local" });

export const env = createEnv({
	runtimeEnv: process.env,

	server: {
		NEWSLETTER_API_KEY: z.string().min(1),
		NEWSLETTER_API_URL: z.string().url(),
	},
});
