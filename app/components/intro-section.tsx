import { Link } from "@remix-run/react";
import type { ReactNode } from "react";
import { Section } from "./section";
import { Noise } from "./noise";
import { cn, tw } from "~/utils/tailwind";
import { useLocale, useString } from "~/i18n";

const LocaleSwitcher = () => {
	const locale = useLocale();
	const t = useString();
	const to = locale === "de" ? "/en" : "/";
	const otherLocale = locale === "de" ? "EN" : "DE";

	return (
		<div className="absolute right-4 top-4 flex gap-4 font-plex-mono font-bold">
			<span className="sr-only">{t("switch-language")}</span>
			<Link className="text-white" to={to}>
				{otherLocale}
			</Link>
		</div>
	);
};

type IntroSectionProps = {
	subline: ReactNode;
	dateLocation: ReactNode;
};

const p = tw`font-plex-mono text-lg leading-snug tracking-plex-mono text-black lg:text-2xl lg:leading-snug`;

export const IntroSection: React.FC<IntroSectionProps> = ({
	dateLocation,
	subline,
}) => {
	const t = useString();

	return (
		<Section
			theme="lime"
			className={tw`flex min-h-[90vh] flex-1`}
			innerClassName={tw`mb-0 mt-0 flex w-full flex-col items-center justify-center gap-[10vh]`}
		>
			<a
				href="#intro"
				className="w-32 md:w-52"
				aria-label={t("scroll-to-bottom")}
			>
				<img
					src="/logo.svg"
					alt="hcknzs"
					className="relative left-[7%] m-auto block"
				/>
				<span aria-hidden="true" className="absolute inset-0" />
			</a>

			<div>
				<p className={cn(p)}>{subline}</p>
				<p className={cn(p, tw`text-purple underline`)}>
					{dateLocation}
				</p>
			</div>
			<Noise className="text-white" opacity={0.7} busyness={40} />

			<LocaleSwitcher />
		</Section>
	);
};
