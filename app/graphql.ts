/* eslint-disable no-restricted-imports */
import { initGraphQLTada } from "gql.tada";
import type { introspection } from "./graphql-env.d.ts";

export const graphql = initGraphQLTada<{
	introspection: introspection;
	scalars: {
		ItemId: string;
		JSON: unknown;
	};
}>();

export type { ResultOf, VariablesOf } from "gql.tada";
