import invariant from "tiny-invariant";
import { MetaFunction } from "@remix-run/react";
import { HxBoundary } from "uberschrift";
import { ActionFunction, json } from "@remix-run/node";
import Intro from "../components/content/intro.mdx";
import What from "../components/content/what.mdx";
import Topics from "../components/content/topics.mdx";
import Faq from "../components/content/faq.mdx";
import { Noise } from "../components/noise";
import { ProseWrapper, Section, SectionInner } from "~/components/misc";
import { NewsletterSection } from "~/components/newsletter-section";
import { env } from "~/env";
import { IntroSection } from "~/components/intro-section";

export const meta: MetaFunction = () => {
	return [
		{
			title: "hcknzs — Hackathon und Ideenfestival für neue Protestformen",
		},
		{
			content: "Hackathon und Ideenfestival für neue Protestformen",
			name: "description",
		},
	];
};

const Index = () => {
	return (
		<main className="">
			<h1 className="sr-only">hcknzs</h1>
			<HxBoundary>
				<div className="flex flex-col min-h-screen">
					<IntroSection />
					<Section color="black" id="intro">
						<p className="font-plex-mono tracking-plex-mono text-md lg:text-xl text-center cursor">
							Findest Du nicht auch, 2024 ist ein gutes Jahr, um
							einfach mal die Schnauze voll zu haben?
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
							Impressum & Datenschutz
						</a>
					</ProseWrapper>
				</footer>
			</HxBoundary>
		</main>
	);
};

export default Index;

export const action: ActionFunction = async ({ request }) => {
	try {
		const newsletterUrl = env.BREVO_API_URL;
		const newsletterKey = env.BREVO_API_KEY;

		invariant(newsletterKey, "No Brevo key provided");
		invariant(newsletterUrl, "No Brevo URL provided");

		const formData = await request.formData();
		const email = formData.get("email");

		invariant(email, "No email provided");

		const response = await fetch(newsletterUrl, {
			body: JSON.stringify({
				email,
				includeListIds: [5],
				redirectionUrl: "https://www.hcknzs.com/subscribed",
				templateId: 1,
			}),
			headers: {
				accept: "application/json",
				"api-key": newsletterKey,
				"content-type": "application/json",
			},
			method: "POST",
		});

		const result = await response.json();

		if (!response.ok) {
			throw new Error(
				`Something went wrong on the other end: ${JSON.stringify(result, null, 2)}`,
			);
		}

		return json({ error: null, isSuccess: true });
	} catch (error) {
		if (!(error instanceof Error)) {
			throw new Error("Unknown error");
		}

		return json(
			{
				error: error.message,
				isSuccess: false,
			},
			{ status: 400 },
		);
	}
};

export type ActionData = { error: string | null; isSuccess: boolean };
