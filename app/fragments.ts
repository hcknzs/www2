import { responsiveImageFragment } from "./components/cms-image";
import { countdownFragment } from "./components/countdown";
import { osMapFragment } from "./components/os-map";
import { ResultOf, graphql } from "~/graphql";

export const siteSettingsFragment = graphql(`
	fragment SiteSettings on SettingsModelRecord {
		navigation {
			__typename

			... on NavLinkRecord {
				id
				url
				label
			}
			... on NavPageRecord {
				id
				page {
					urlSlug
				}
				label
			}
		}
	}
`);

export const pageContentFragment = graphql(
	`
		fragment PageContent on PageRecord {
			id
			titleInternal
			seo: _seoMetaTags {
				attributes
				content
				tag
			}
			urlSlug
			content {
				__typename

				... on ReferencePageSectionCollectionRecord {
					id
					page {
						id
					}
				}

				... on SectionFundingRecord {
					id
				}

				... on SectionImageHeaderRecord {
					id
					text
					color {
						hex
					}
					image {
						...ResponsiveImage
					}
				}

				... on SectionIntroRecord {
					id
					subline
					dateLocation
					size
				}
				... on SectionNewsletterRecord {
					id
					instagramLinkText
					title
					subline
				}
				... on SectionTextRecord {
					id
					sectionSlug
					sectionTheme
					noise
					content {
						blocks {
							...Map
							...Countdown
						}
						links
						value
					}
				}
			}
		}
	`,
	[responsiveImageFragment, osMapFragment, countdownFragment],
);
export type SectionType = ResultOf<
	typeof pageContentFragment
>["content"][number];
