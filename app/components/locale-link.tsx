import { cn } from "@peerigon/pupper/tailwind";
import { Link, LinkProps } from "@remix-run/react";
import { forwardRef } from "react";
import { useLocale, useString } from "~/i18n";

export const LocaleLink = forwardRef<
	HTMLAnchorElement,
	Omit<LinkProps, "to"> & { isOther?: boolean }
>(({ className, isOther = false, ...rest }, ref) => {
	const curentLocale = useLocale();
	const uncurrentLocale = curentLocale === "de" ? "en" : "de";

	const linkLocale = isOther ? curentLocale : uncurrentLocale;

	const t = useString();
	const isCurrent = curentLocale === linkLocale;

	return (
		<Link
			ref={ref}
			aria-label={t("switch-language")}
			className={cn(isCurrent && "underline", className)}
			to={`/${linkLocale}`}
			{...rest}
		>
			{linkLocale}
		</Link>
	);
});

LocaleLink.displayName = "LocaleLink";
