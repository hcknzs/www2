import { createEnv } from "@t3-oss/env-core";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: ".vercel/.env.development.local" });

export const env = createEnv({
	runtimeEnv: process.env,

	server: {
		BREVO_API_KEY: z.string().min(1),
		BREVO_API_URL: z.string().url(),
		CMS_API_TOKEN_READONLY: z.string().min(1),
		CMS_ENDPOINT: z.string().url(),
		CMS_INCLUDE_DRAFTS: z.string().optional(),
	},
});
