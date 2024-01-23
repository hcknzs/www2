import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import "@fontsource/ibm-plex-mono/400-italic.css";
import "@fontsource/ibm-plex-mono/700-italic.css";
import "@fontsource/ibm-plex-mono/700.css";
import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/300-italic.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import stylesheet from "./tailwind.css";

export const links: LinksFunction = () => {
	return [
		{ href: stylesheet, rel: "stylesheet" },
		{
			href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>~</text></svg>",
			rel: "icon",
		},
		...(cssBundleHref ? [{ href: cssBundleHref, rel: "stylesheet" }] : []),
	];
};

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<html lang="de" className="scroll-smooth">
				<head>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1"
					/>
					<Meta />
					<Links />
				</head>
				<body className="font-plex">
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
		</QueryClientProvider>
	);
};

export default App;
