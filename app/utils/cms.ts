import type { DocumentNode } from "graphql";
import { print } from "graphql";
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

	if (environment) {
		headers.set("X-Environment", environment);
	}

	if (includeDrafts) {
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

	const { data } = (await response.json()) as { data: ResultOf<Q> };
	return data;
};
