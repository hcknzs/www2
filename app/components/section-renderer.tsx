import { StructuredText } from "react-datocms";
import { isStructuredText } from "datocms-structured-text-utils";
import { IntroSection } from "./intro-section";
import { NewsletterSection } from "./newsletter-section";
import { TextSection, isTheme } from "./text-section";
import type { pageQuery } from "~/queries";
import { ResultOf } from "~/graphql";
import { replacePipeWithBr } from "~/i18n";

type SectionType = NonNullable<
	NonNullable<ResultOf<typeof pageQuery>["page"]>["content"]
>[number];

type SectionRendererProps = {
	sections: Array<SectionType>;
};

export const SectionRenderer: React.FC<SectionRendererProps> = ({
	sections,
}) => {
	return (
		<>
			{sections.map((section) => {
				switch (section.__typename) {
					case "SectionIntroRecord":
						return (
							<IntroSection
								key={section.id}
								dateLocation={section.dateLocation}
								subline={replacePipeWithBr(section.subline)}
							/>
						);
					case "SectionNewsletterRecord":
						return (
							<NewsletterSection
								key={section.id}
								intro={section.intro ?? undefined}
								instagramLinkText={section.instagramLinkText}
							/>
						);
					case "SectionTextRecord": {
						if (!isStructuredText(section.content)) {
							return null;
						}

						return (
							<TextSection
								key={section.id}
								theme={
									isTheme(section.sectionTheme)
										? section.sectionTheme
										: undefined
								}
								anchor={section.sectionSlug ?? undefined}
							>
								<StructuredText data={section.content} />
							</TextSection>
						);
					}
					default:
						return null;
				}
			})}
		</>
	);
};
