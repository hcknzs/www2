import { MetaFunction } from "@remix-run/react";
import { HxBoundary } from "uberschrift";
import Intro from "../components/content/intro-en.mdx";
import What from "../components/content/what-en.mdx";
import Topics from "../components/content/topics-en.mdx";
import Faq from "../components/content/faq-en.mdx";
import { ProseWrapper, Section, SectionInner } from "~/components/misc";
import { NewsletterSection } from "~/components/newsletter-section";
import { Noise } from "~/components/noise";
import { IntroSection } from "~/components/intro-section";
import { StringProvider } from "~/i18n";

export const meta: MetaFunction = () => {
	return [
		{
			title: "hcknzs — Hackathon and ideas festival for new forms of protest",
		},
		{
			content: "Hackathon and ideas festival for new forms of protest",
			name: "description",
		},
	];
};

const Index = () => {
	return (
		<StringProvider locale="en">
			<main className="">
				<h1 className="sr-only">hcknzs</h1>
				<HxBoundary>
					<div className="flex flex-col min-h-screen">
						<IntroSection />
						<Section color="black" id="intro">
							<p className="font-plex-mono tracking-plex-mono text-md lg:text-xl text-center cursor">
								Don&apos;t you think 2024 is a good year to just
								have enough?
							</p>
						</Section>
					</div>
					<Section color="purple">
						<ProseWrapper>
							<Intro />
						</ProseWrapper>
					</Section>
					<NewsletterSection />
					<Section color="teal">
						<ProseWrapper>
							<What />
							<Noise busyness={7} />
						</ProseWrapper>
					</Section>
					<Section color="black">
						<ProseWrapper>
							<Topics />
						</ProseWrapper>
					</Section>
					<NewsletterSection />
					<Section anchor="faq" color="purple">
						<ProseWrapper className="beam-none">
							<Faq />
						</ProseWrapper>
					</Section>
					<footer className="py-8 lg:py-24 flex flex-col bg-red text-black">
						<SectionInner className="py-6">
							<a
								href="#intro"
								className="inline-block"
								aria-label="Nach oben scrollen"
							>
								<img
									src="/signet.svg"
									alt="hcknzs"
									className="w-auto h-6 align-middle relative top-[0.3em]"
								/>
							</a>
							<span className="font-plex-mono tracking-plex-mono text-lime ml-3 text-2xl">
								{new Date().getFullYear()}
							</span>
						</SectionInner>
						<ProseWrapper>
							<a
								href="https://bluespotsproductions.de/impressum"
								target="_blank"
								rel="noreferrer"
								className="font-plex-mono tracking-plex-mono"
							>
								Legal &amp; Privacy Notice
							</a>
						</ProseWrapper>
					</footer>
				</HxBoundary>
			</main>
		</StringProvider>
	);
};

export default Index;

export { action } from "./_index";
