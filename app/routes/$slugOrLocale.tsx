import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import PageComponent, {
	action,
	loader as realLoader,
	meta,
} from "./$locale.$slug.js";
import { isLocale } from "../i18n.js";

export default PageComponent;

export const loader = async (args: LoaderFunctionArgs) => {
	const slugOrLocale = args.params.slugOrLocale;

	if (!slugOrLocale) {
		return realLoader(args);
	}

	if (isLocale(slugOrLocale)) {
		return realLoader({
			...args,
			params: { locale: slugOrLocale, slug: "index" },
		});
	}

	return redirect(`/de/${slugOrLocale}`);
};

export { action, meta };
