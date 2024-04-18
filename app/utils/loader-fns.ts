import type { LoaderFunctionArgs } from "@remix-run/node";
import { isLocale } from "~/i18n";

export const getLocaleFromParams = (params: LoaderFunctionArgs["params"]) => {
	const locale = params.locale ?? ("de" as const);
	if (!isLocale(locale)) {
		throw new Response(null, {
			status: 400,
			statusText: "Invalid locale",
		});
	}

	return locale;
};
