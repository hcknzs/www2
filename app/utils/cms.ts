import type { DocumentNode } from "graphql";
import { print } from "graphql";
import { z } from "zod";
import { env } from "~/env";
import { ResultOf, VariablesOf } from "~/graphql";

export const fetchFromCms = async <Q extends DocumentNode>({
	query,
	variables,
	environment,
	excludeInvalid,
	includeDrafts,
}: {
	query: Q;
	variables: VariablesOf<Q>;
	environment?: string;
	includeDrafts?: boolean;
	excludeInvalid?: boolean;
}) => {
	const url = env.CMS_ENDPOINT;

	const headers = new Map<string, string>();

	headers.set("Authorization", `Bearer ${env.CMS_API_TOKEN_READONLY}`);

	const isLocalhost = env.CMS_INCLUDE_DRAFTS === "true";

	if (environment) {
		headers.set("X-Environment", environment);
	}

	if (includeDrafts || isLocalhost) {
		headers.set("X-Include-Drafts", "true");
	}

	if (excludeInvalid) {
		headers.set("X-Exclude-Invalid", "true");
	}

	const response = await fetch(url, {
		body: JSON.stringify({ query: print(query), variables }),
		headers: Object.fromEntries(headers.entries()),
		method: "POST",
	});

	if (!response.ok) {
		throw new Error(
			`Failed to fetch data from CMS: ${response.statusText}`,
		);
	}

	const json = await response.json();

	const { errors, data } = z
		.object({
			data: z.unknown(),
			errors: z
				.array(
					z.object({
						message: z.string(),
					}),
				)
				.optional(),
		})
		.parse(json);

	if (errors) {
		throw new Error(
			`Failed to fetch data from CMS: ${errors
				.map((error) => error.message)
				.join(", ")}`,
		);
	}

	return data as ResultOf<Q>;
};
