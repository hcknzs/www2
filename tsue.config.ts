import { TsueConfig } from "@peerigon/pupper/tsue";

export default {
	// ignore these entirely:
	ignore: ["app/graphql-env.d.ts", "app/components/icons/*.tsx"],
	rules: [
		// All *.config.* files can have a default export but nothing else
		{
			allowedNames: ["default"],
			path: "*.config.*",
		},
		{
			allowedNames: ["loader", "action", "links", "default"],
			path: "./app/root.tsx",
		},
		{
			allowedNames: ["FragmentOf"],
			path: "./app/graphql.ts",
		},
		{
			allowedNames: ["loader", "action", "default", "meta"],
			path: "./app/routes/**/*",
		},
		// Component files may export their prop type
		{
			allowedNames: ["^[A-Z](([a-z0-9]+[A-Z]?)*)Props$"],
			path: "./app/components/**/*.tsx",
		},
		// Storybook/ladle stories export a default export and named exports that are PascalCase (components)
		{
			allowedNames: ["default", "^[A-Z](([a-z0-9]+[A-Z]?)*)$"],
			path: "./**/*.stories.*",
		},
	],
} satisfies TsueConfig;
