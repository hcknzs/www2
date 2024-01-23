/** @type {import('@remix-run/dev').AppConfig} */
export default {
	browserNodeBuiltinsPolyfill: {
		modules: { crypto: true, os: true, path: true },
	},
	ignoredRouteFiles: ["**/.*"],
};
