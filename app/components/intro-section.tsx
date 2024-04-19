import type { ReactNode } from "react";
import { cn, tw } from "@peerigon/pupper/tailwind";
import { Section } from "./section";
import { Noise } from "./noise";
import { useString } from "~/i18n";

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
		</Section>
	);
};
