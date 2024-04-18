import type { DocumentNode } from "graphql";
import { print } from "graphql";
import { env } from "~/env";
import { ResultOf, VariablesOf } from "~/graphql";

export const fetchFromCms = async <Q extends DocumentNode>({
	query,
	variables,
}: {
	query: Q;
	variables: VariablesOf<Q>;
}) => {
	const url = env.CMS_ENDPOINT;

	const headers = {
		Authorization: `Bearer ${env.CMS_API_TOKEN_READONLY}`,
	};

	// if (process.env.CMS_ENVIRONMENT) {
	//   headers['X-Environment'] = process.env.CMS_ENVIRONMENT;
	// }
	// if (includeDrafts) {
	//   headers['X-Include-Drafts'] = 'true';
	// }
	// if (excludeInvalid) {
	//   headers['X-Exclude-Invalid = 'true';
	// }

	const response = await fetch(url, {
		body: JSON.stringify({ query: print(query), variables }),
		headers,
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
