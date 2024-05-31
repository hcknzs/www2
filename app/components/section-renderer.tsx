import { StructuredText, renderNodeRule } from "react-datocms";
import {
	isStructuredText,
	isHeading,
	isLink,
} from "datocms-structured-text-utils";
import { Hx } from "uberschrift";
import { cn } from "@peerigon/pupper/tailwind";
import { IntroSection } from "./intro-section";
import { NewsletterSection } from "./newsletter-section";
import { ProseWrapper, Section, isTheme } from "./section";
import { FundingSection } from "./funding-section";
import { Noise } from "./noise";
import { ImageHeader } from "./image-header";
import { renderBlock } from "./block-renderer";
import { replacePipeWithBr } from "~/i18n";
import type { SectionType } from "~/fragments";

type SectionRendererProps = {
	sections: Array<SectionType>;
};

const hxRule = renderNodeRule(isHeading, ({ node, children, key }) => {
	return (
		<Hx increment={Math.max(0, node.level - 1)} key={key}>
			{children}
		</Hx>
	);
});

const linkRule = renderNodeRule(isLink, ({ node, children, key }) => {
	const metaType = node.meta?.find((m) => m.id === "type")?.value;
	const target = node.meta?.find((m) => m.id === "target")?.value;

	const isButton = metaType === "button";

	return (
		<a
			href={node.url}
			target={target}
			key={key}
			className={cn(
				isButton &&
					"inline-flex h-12 rounded-full border border-purple-400 bg-purple-400 px-5 py-1 font-plex-mono tracking-plex-mono !text-white !no-underline transition-colors hover:bg-purple-500 sm:min-w-[10rem]",
			)}
		>
			{children}
		</a>
	);
});

export const SectionRenderer: React.FC<SectionRendererProps> = ({
	sections,
}) => {
	return (
		<>
			{sections.map((section, index) => {
				switch (section.__typename) {
					case "SectionFundingRecord":
						return <FundingSection key={section.id} />;
					case "SectionIntroRecord":
						return (
							<IntroSection
								key={section.id}
								dateLocation={section.dateLocation}
								subline={replacePipeWithBr(section.subline)}
								isFoldSized={section.size === "full"}
							/>
						);
					case "SectionNewsletterRecord":
						return (
							<NewsletterSection
								key={section.id}
								title={section.title}
								subline={section.subline}
								instagramLinkText={section.instagramLinkText}
							/>
						);
					case "SectionImageHeaderRecord":
						return <ImageHeader key={section.id} {...section} />;
					case "SectionTextRecord": {
						if (!isStructuredText(section.content)) {
							return null;
						}

						return (
							<Section
								index={index}
								key={section.id}
								theme={
									isTheme(section.sectionTheme)
										? section.sectionTheme
										: undefined
								}
								anchor={section.sectionSlug ?? undefined}
							>
								<ProseWrapper
									className={cn(
										section.sectionTheme === "lime" &&
											"text-black",
									)}
								>
									<StructuredText
										customNodeRules={[hxRule, linkRule]}
										data={section.content}
										renderBlock={renderBlock}
									/>
								</ProseWrapper>
								{section.noise && <Noise />}
							</Section>
						);
					}
					default:
						return null;
				}
			})}
		</>
	);
};
