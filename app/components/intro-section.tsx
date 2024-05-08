import type { ReactNode } from "react";
import { cn, tw } from "@peerigon/pupper/tailwind";
import { Section } from "./section";
import { Noise } from "./noise";
import { useString } from "~/i18n";

type IntroSectionProps = {
	subline: ReactNode;
	dateLocation: ReactNode;
	isFoldSized?: boolean;
};

const p = tw`text-md font-plex-mono leading-snug tracking-plex-mono text-black lg:text-2xl lg:leading-snug`;

export const IntroSection: React.FC<IntroSectionProps> = ({
	dateLocation,
	subline,
	isFoldSized = false,
}) => {
	const t = useString();

	return (
		<Section
			theme="lime"
			className={cn(tw`flex flex-1`, isFoldSized && tw`h-screen`)}
			innerClassName={cn(
				"mb-0 mt-0 flex h-full w-full flex-col items-center justify-center gap-16 py-12 text-center lg:flex-row lg:text-left",
			)}
		>
			<a
				href="#intro"
				className={cn(isFoldSized ? "w-32 md:w-48" : "w-32")}
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
