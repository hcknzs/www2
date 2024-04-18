import { StructuredText, renderNodeRule } from "react-datocms";
import { isStructuredText, isHeading } from "datocms-structured-text-utils";
import { Hx } from "uberschrift";
import { IntroSection } from "./intro-section";
import { NewsletterSection } from "./newsletter-section";
import { ProseWrapper, Section, isTheme } from "./section";
import { FundingSection } from "./funding-section";
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
					case "SectionFundingRecord":
						return <FundingSection key={section.id} />;
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
								title={section.title}
								subline={section.subline}
								instagramLinkText={section.instagramLinkText}
							/>
						);
					case "SectionTextRecord": {
						if (!isStructuredText(section.content)) {
							return null;
						}

						return (
							<Section
								key={section.id}
								theme={
									isTheme(section.sectionTheme)
										? section.sectionTheme
										: undefined
								}
								anchor={section.sectionSlug ?? undefined}
							>
								<ProseWrapper>
									<StructuredText
										customNodeRules={[
											renderNodeRule(
												isHeading,
												({ node, children, key }) => {
													return (
														<Hx
															increment={Math.max(
																0,
																node.level - 1,
															)}
															key={key}
														>
															{children}
														</Hx>
													);
												},
											),
										]}
										data={section.content}
									/>
								</ProseWrapper>
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
