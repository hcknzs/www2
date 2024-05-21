import { ResultOf } from "~/graphql";
import { siteSettingsFragment } from "~/fragments";
import { Locale } from "~/i18n";

type SiteSettings = {
	menuItems: Array<{
		label: string;
		to: string;
		key: string;
		target?: "_blank";
	}>;
};

export const normalizeSiteSettings = (
	settingsRaw: ResultOf<typeof siteSettingsFragment>,
	locale: Locale,
): SiteSettings => {
	const menuItems = settingsRaw.navigation.map((item) => {
		if (item.__typename === "NavLinkRecord") {
			return {
				key: item.id,
				label: item.label,
				target: "_blank" as const,
				to: item.url,
			};
		}

		const slug = item.page.urlSlug === "index" ? "" : item.page.urlSlug;

		return {
			key: item.id,
			label: item.label,
			prefetch: "intent" as const,
			to: `/${locale}/${slug}`,
		};
	});

	return {
		menuItems,
	};
};
