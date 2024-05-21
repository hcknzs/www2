import { StructuredText, renderNodeRule } from "react-datocms";
import { isStructuredText, isHeading } from "datocms-structured-text-utils";
import { Hx } from "uberschrift";
import { cn } from "@peerigon/pupper/tailwind";
import { IntroSection } from "./intro-section";
import { NewsletterSection } from "./newsletter-section";
import { ProseWrapper, Section, isTheme } from "./section";
import { FundingSection } from "./funding-section";
import { Noise } from "./noise";
import { HeaderImage } from "./header-image";
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
						return <HeaderImage key={section.id} {...section} />;
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
										customNodeRules={[hxRule]}
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
