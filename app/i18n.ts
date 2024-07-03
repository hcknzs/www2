import type { ReactElement, ReactNode } from "react";
import {
	Fragment,
	createElement,
	isValidElement,
	createContext,
	useContext,
} from "react";

const de = {
	anchor: "Direktlink zu diesem Abschnitt",
	"footer.legal": "Impressum & Datenschutz",
	"funding.alt.dl":
		"Gefördert vom: Bundesministerium für Familie, Senioren, Frauen und Jugend im Rahmen des Bundesprogramms Demokratie Leben!",
	"funding.alt.fa": "Gefördert von: Friedensstadt Augsburg",
	"funding.title": "Förderungen",
	"menu.close": "Menü schließen",
	"menu.open": "Menü öffnen",
	"menu.title": "Menü",
	"newsletter.email": "email",
	"newsletter.instagram": "Instagram!",
	"newsletter.thanks": "Danke!",
	"projects-title": "Projekte",
	"scroll-to-bottom": "Nach unten scrollen",
	send: "Absenden",
	"switch-language": "Switch language: Deutsch",
} as const;

const en: Record<keyof typeof de, string> = {
	anchor: "Direct link to this section",
	"footer.legal": "Legal & Privacy Notice",
	"funding.alt.dl":
		"Funded by: Federal Ministry for Family Affairs, Senior Citizens, Women and Youth as part of the federal program Demokratie Leben!",
	"funding.alt.fa": "Funded by: Friedensstadt Augsburg",
	"funding.title": "Fundings",
	"menu.close": "Close menu",
	"menu.open": "Open menu",
	"menu.title": "Menu",
	"newsletter.email": "email",
	"newsletter.instagram": "Instagram!",
	"newsletter.thanks": "Thanks!",
	"projects-title": "Projects",
	"scroll-to-bottom": "Scroll to bottom",
	send: "Send",
	"switch-language": "Sprache wechseln: Englisch",
} as const;

const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export const isLocale = (str: string): str is Locale =>
	locales.includes(str as Locale);

const StringContext = createContext<Locale>("de");

export const StringProvider: React.FC<{
	locale: Locale;
	children?: ReactNode;
}> = ({ locale, children }) => {
	return createElement(StringContext.Provider, { value: locale }, children);
};

export const useLocale = () => useContext(StringContext);

export const replacePipeWithBr = (str?: string) => {
	if (!str) {
		return "";
	}

	return replaceInString(str, "|", createElement("br"));
};

const replaceInString = (
	haystack: string,
	needle: string,
	replace: ReactNode,
): ReactElement | string => {
	if (!haystack.includes(needle)) {
		return haystack;
	}

	const isElement = isValidElement(replace);
	const parts = haystack
		.split(needle)
		.map((part, index) => {
			const key = [part, index].join("-");

			return [
				part,
				createElement(Fragment, { key }, [
					isElement ? { ...replace, key: "replace-" + key } : replace,
				]),
			];
		})
		.flat()
		.slice(0, -1);

	return createElement(Fragment, { key: haystack }, parts);
};

export const useString = (forceLocale?: Locale) => {
	const ctxLocale = useLocale();

	const locale = forceLocale ? forceLocale : ctxLocale;

	const language = locale === "de" ? de : en;
	return (key: keyof typeof language) => language[key];
};
