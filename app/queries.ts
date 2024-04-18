import { FragmentOf, graphql } from "./graphql";

const pageContentFragment = graphql(`
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

export const getPageBySlugAndLocale = graphql(
	`
		query GetPageBySlugAndLocale($slug: String!, $locale: SiteLocale!) {
			page(
				locale: $locale
				fallbackLocales: [de]
				filter: { urlSlug: { eq: $slug } }
			) {
				...PageContent
			}
		}
	`,
	[pageContentFragment],
);

export const getPageByIdAndLocale = graphql(
	`
		query GetPageByIdAndLocale($id: ItemId!, $locale: SiteLocale!) {
			page(
				locale: $locale
				fallbackLocales: [de]
				filter: { id: { eq: $id } }
			) {
				...PageContent
			}
		}
	`,
	[pageContentFragment],
);
