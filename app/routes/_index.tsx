import { MetaFunction } from "@remix-run/react";
import { HxBoundary } from "uberschrift";
import Intro from "../components/content/intro.mdx";
import What from "../components/content/what.mdx";
import Topics from "../components/content/topics.mdx";
import { Noise } from "../components/noise";
import { ProseWrapper, Section } from "~/components/misc";
import { NewsletterSection } from "~/components/newsletter-section";

export const meta: MetaFunction = () => {
	return [
		{ title: "hcknzs — Hackathon und Ideenfestival gegen Rechts" },
		{
			content: "Hackathon und Ideenfestival gegen Rechts",
			name: "description",
		},
	];
};

const Index = () => {
	return (
		<main className="">
			<h1 className="sr-only">hcknzs</h1>
			<HxBoundary>
				<Section
					color="red"
					className="h-screen flex flex-col items-center justify-center"
				>
					<a href="#intro" className="w-64">
						<img
							src="/logo.svg"
							alt="hcknzs"
							className="m-auto py-12 block"
						/>
						<span aria-hidden="true" className="absolute inset-0" />
					</a>

					<p className="text-white p-4 cursor font-plex-mono tracking-plex-mono text-2xl text-center">
						Hackathon gegen Rechts
						<br />
						19.—21. Juli 2024
						<br />@ Schwabencenter Augsburg
					</p>
					<Noise className="text-lime" opacity={0.7} busyness={40} />
				</Section>
				<Section color="black" id="intro">
					<p className="font-plex-mono tracking-plex-mono text-2xl text-center">
						Findest Du nicht auch, 2024 ist ein gutes Jahr, um
						einfach mal die Schnauze voll zu haben?
					</p>
				</Section>
				<NewsletterSection />
				<Section color="purple">
					<ProseWrapper>
						<Intro />
					</ProseWrapper>
				</Section>
				<Section color="teal">
					<ProseWrapper>
						<What />
						<Noise busyness={7} />
					</ProseWrapper>
				</Section>
				<NewsletterSection />
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
