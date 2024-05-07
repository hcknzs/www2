import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";

import "@fontsource/ibm-plex-mono/400-italic.css";
import "@fontsource/ibm-plex-mono/600-italic.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/300-italic.css";

import { renderMetaTags } from "react-datocms";
import stylesheet from "./tailwind.css";
import { fetchFromCms } from "./utils/cms";
import { graphql } from "./graphql";
import { StringProvider } from "./i18n";
import { getLocaleFromParams } from "./utils/loader-fns";
import { GlobalNavigationStatusIndicator } from "./components/global-navigation-status-indicator";

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
	const locale = getLocaleFromParams(params);

	const data = await fetchFromCms({
		query: graphql(`
			query SiteSeoSettings {
				site: _site {
					faviconMetaTags(
						variants: [icon, msApplication, appleTouchIcon]
					) {
						attributes
						content
						tag
					}
				}
			}
		`),
		variables: {},
	});

	return { ...data, locale };
};

export const links: LinksFunction = () => {
	return [
		{ href: stylesheet, rel: "stylesheet" },
		...(cssBundleHref ? [{ href: cssBundleHref, rel: "stylesheet" }] : []),
	];
};

const App = () => {
	const { site, locale } = useLoaderData<typeof loader>();

	return (
		<StringProvider locale={locale}>
			<html lang="de" className="scroll-smooth">
				<head>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1"
					/>
					<Meta />
					<Links />

					{/* @ts-expect-error This is failing and I'm not sure why*/}
					{renderMetaTags(site.faviconMetaTags)}
				</head>
				<body className="font-plex">
					<GlobalNavigationStatusIndicator />
					<Outlet />
					<ScrollRestoration />
					<Scripts />
					<LiveReload />

					<script
						data-goatcounter="https://hcknzs.goatcounter.com/count"
						async
						src="//gc.zgo.at/count.js"
					/>
				</body>
			</html>
		</StringProvider>
	);
};

export default App;
