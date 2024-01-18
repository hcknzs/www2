import { MetaFunction } from "@remix-run/react";
import { HxBoundary } from "uberschrift";
import Intro from "../components/content/intro.mdx";
import What from "../components/content/what.mdx";
import Topics from "../components/content/topics.mdx";
import { Noise } from "../components/noise";
import { prose } from "../styles";
import { cn, tw } from "../utils/tailwind";
import { slc } from "~/utils/components";

export const meta: MetaFunction = () => {
	return [
		{ title: "hcknzs — Hackathon und Ideenfestival gegen Rechts" },
		{
			content: "Hackathon und Ideenfestival gegen Rechts",
			name: "description",
		},
	];
};

const Section: React.FC<{
	color?: "red" | "teal" | "purple" | "black" | "lime";
	className?: string;
	children?: React.ReactNode;
}> = ({ color, className, ...rest }) => {
	const themes = {
		black: tw`bg-black text-white`,
		lime: tw`bg-lime text-black`,
		purple: tw`bg-purple text-black`,
		red: tw`bg-red text-black`,
		teal: tw`bg-teal text-white`,
	};

	return (
		<section
			className={cn(
				className,
				themes[color ?? "red"],
				tw`py-8 lg:py-24 relative`
			)}
			{...rest}
		/>
	);
};

const ProseWrapper = slc(
	"div",
	cn(tw`max-w-screen-md m-auto text-white`, prose)
);

const Index = () => {
	return (
		<main className="">
			<h1 className="sr-only">hcknzs</h1>
			<HxBoundary>
				<Section
					color="red"
					className="h-screen flex flex-col items-center justify-center"
				>
					<img
						src="/logo.svg"
						alt="hcknzs"
						className="m-auto max-w-64 py-12"
					/>

					<p className="cursor font-plex-mono tracking-plex-mono text-2xl text-center">
						Hackathon gegen Rechts
						<br />
						19.—21. Juli 2024
						<br />@ Schwabencenter Augsburg
					</p>
					<Noise className="text-lime" opacity={0.7} busyness={100} />
				</Section>
				<Section color="black">
					<p className="font-plex-mono tracking-plex-mono text-2xl text-center">
						Findest Du nicht auch, 2024 ist ein gutes Jahr, um
						einfach mal die Schnauze voll zu haben?
					</p>
					<Noise busyness={7} />
				</Section>
				<Section color="purple">
					<ProseWrapper>
						<Intro />
					</ProseWrapper>
				</Section>
				<Section color="teal">
					<ProseWrapper>
						<What />
					</ProseWrapper>
				</Section>
				<Section color="black">
					<ProseWrapper>
						<Topics />
					</ProseWrapper>
				</Section>
			</HxBoundary>
		</main>
	);
};

export default Index;
