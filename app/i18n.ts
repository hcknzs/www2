import {
	Fragment,
	ReactElement,
	ReactNode,
	createElement,
	isValidElement,
	createContext,
	useContext,
} from "react";

const de = {
	"date-location": "Augsburg, 19.—21. Juli 2024",
	"funding.alt":
		"Gefördert vom: Bundesministerium für Familie, Senioren, Frauen und Jugend im Rahmen des Bundesprogramms Demokratie Leben!",
	"funding.title": "Förderungen",
	"newsletter.follow": "Oder folge uns auf",
	"newsletter.subline":
		"Lass' uns deine E-Mail da und wir melden uns bei dir!",
	"newsletter.title": "Interesse?",
	"scroll-to-bottom": "Nach unten scrollen",
	send: "Absenden",
	subline: "Hackathon und Ideenfestival|für neue Protestformen",
	"switch-language": "Switch language",
} as const;

const en = {
	"date-location": "Augsburg, July 19—21 2024",
	"funding.alt":
		"Funded by: Federal Ministry for Family Affairs, Senior Citizens, Women and Youth as part of the federal program Demokratie Leben!",
	"funding.title": "Fundings",
	"newsletter.follow": "Or follow us on",
	"newsletter.subline": "Leave us your E-Mail and we will get back to you!",
	"newsletter.title": "Interested?",
	"scroll-to-bottom": "Scroll to bottom",
	send: "Send",
	subline: "Hackathon and ideas festival|for new forms of protest",
	"switch-language": "Sprache wechseln",
} as const;

const locales = ["de", "en"] as const;
type Locale = (typeof locales)[number];

export const StringContext = createContext<Locale>("de");

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

export const replaceInString = (
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

export const usePipedString = (forceLocale?: Locale) => {
	const t = useString(forceLocale);

	return (key: keyof typeof de) => replacePipeWithBr(t(key));
};
