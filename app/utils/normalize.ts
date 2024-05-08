import { Locale } from "~/i18n";
import type { SiteSettingsRaw } from "~/fragments";

type SiteSettings = {
	menuItems: Array<{
		label: string;
		to: string;
		key: string;
		target?: "_blank";
	}>;
};

export const normalizeSiteSettings = (
	settingsRaw: SiteSettingsRaw,
	locale: Locale,
): SiteSettings => {
	const menuItems =
		settingsRaw?.navigation.map((item) => {
			if (item.__typename === "NavLinkRecord") {
				return {
					key: item.id,
					label: item.label,
					target: "_blank" as const,
					to: item.url,
				};
			}

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (item.__typename === "NavPageRecord") {
				const slug =
					item.page.urlSlug === "index" ? "" : item.page.urlSlug;

				return {
					key: item.id,
					label: item.label,
					prefetch: "intent" as const,
					to: `/${locale}/${slug}`,
				};
			}

			// the any here is to force the runtime check, even if typescript considers this unreachable
			throw new Error(
				`Unknown navigation item type: ${(item as any).__typename}`,
			);
		}) ?? [];

	return {
		menuItems,
	};
};
