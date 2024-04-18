/** @type {import('eslint').Linter.Config} */

module.exports = {
	env: { browser: true, es2020: true, node: true },
	extends: [
		"peerigon/presets/typescript-react.js",
		"plugin:canonical/recommended",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["canonical"],
	root: true,
	rules: {
		"canonical/destructuring-property-newline": "off",
		"canonical/export-specifier-newline": "off",
		"canonical/filename-match-regex": [
			2,
			{ ignoreExporting: true, regex: "^[a-z0-9\\._\\-]+$" },
		],
		"canonical/import-specifier-newline": "off",
		"import/extensions": "off",
		"no-console": ["warn"],
		"react/prop-types": "off",
	},
};
