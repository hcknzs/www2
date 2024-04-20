import { Link, LinkProps } from "@remix-run/react";
import { forwardRef } from "react";
import { useLocale, useString } from "~/i18n";

export const LocaleLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, "to">>(
	({ className, ...rest }, ref) => {
		const locale = useLocale();
		const t = useString();
		const to = locale === "de" ? "/en" : "/";
		const otherLocale = locale === "de" ? "EN" : "DE";

		return (
			<Link
				ref={ref}
				aria-label={t("switch-language")}
				className={className}
				to={to}
				{...rest}
			>
				{otherLocale}
			</Link>
		);
	},
);

LocaleLink.displayName = "LocaleLink";
