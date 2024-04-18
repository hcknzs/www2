import { graphql } from "./graphql";

export const pageQuery = graphql(`
	query GetPageBySlugAndLocale($slug: String!, $locale: SiteLocale!) {
		page(
			locale: $locale
			fallbackLocales: [de]
			filter: { urlSlug: { eq: $slug } }
		) {
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
				... on SectionIntroRecord {
					id
					subline
					dateLocation
				}
				... on SectionNewsletterRecord {
					id
					instagramLinkText
					intro(markdown: true)
				}
				... on SectionTextRecord {
					id
					sectionSlug
					sectionTheme
					content {
						blocks
						links
						value
					}
				}
			}
		}
	}
`);
