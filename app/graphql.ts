/* eslint-disable no-restricted-imports */
import { initGraphQLTada } from "gql.tada";
import type { introspection } from "./graphql-env.d.ts";

export const graphql = initGraphQLTada<{
	introspection: introspection;
	scalars: {
		ItemId: string;
		IntType: number;
		BooleanType: boolean;
		JSON: unknown;
	};
}>();

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
