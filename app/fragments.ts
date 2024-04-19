import { FragmentOf, graphql } from "./graphql";

export const siteSettingsFragment = graphql(`
	fragment SiteSettings on Query @_unmask {
		settings: settingsModel(locale: $locale) {
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
	}
`);

export type SiteSettingsRaw = FragmentOf<
	typeof siteSettingsFragment
>["settings"];

export const pageContentFragment = graphql(`
	fragment PageContent on PageRecord @_unmask {
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

			... on SectionIntroRecord {
				id
				subline
				dateLocation
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
					blocks
					links
					value
				}
			}
		}
	}
`);

export type SectionType = FragmentOf<
	typeof pageContentFragment
>["content"][number];
