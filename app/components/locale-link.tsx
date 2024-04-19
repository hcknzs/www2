import { Link, LinkProps } from "@remix-run/react";
import { useLocale, useString } from "~/i18n";

export const LocaleLink = ({ className, to: _, ...rest }: LinkProps) => {
	const locale = useLocale();
	const t = useString();
	const to = locale === "de" ? "/en" : "/";
	const otherLocale = locale === "de" ? "EN" : "DE";

	return (
		<>
			<span className="sr-only">{t("switch-language")}</span>
			<Link className={className} to={to} {...rest}>
				{otherLocale}
			</Link>
		</>
	);
};
