import { Section, SectionInner } from "./misc";

export const NewsletterSection = () => {
	return (
		<Section color="lime">
			<SectionInner>
				<a
					className="block leading-none font-plex-mono tracking-plex-mono text-purple-400"
					href="https://instagram.com/hck.nzs"
					target="_blank"
					rel="noreferrer"
				>
					<img
						className="w-8 h-8 align-middle mr-2 inline"
						src="insta.svg"
						alt="Instagram logo"
					/>{" "}
					Folge uns auf Instagram!
				</a>
			</SectionInner>
		</Section>
	);
};
