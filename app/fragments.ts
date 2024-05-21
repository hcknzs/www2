import { ResultOf, graphql } from "~/graphql";

const responsiveImageFragment = graphql(`
	fragment ResponsiveImage on FileFieldInterface @_unmask {
		responsiveImage(imgixParams: { w: 600, auto: format }) {
			# always required
			src
			srcSet
			width
			height

			# not required, but strongly suggested!
			alt
			title

			# blur-up placeholder, JPEG format, base64-encoded, or...
			base64
			# background color placeholder
			bgColor

			sizes
		}
	}
`);

export type ResponsiveImageType = ResultOf<typeof responsiveImageFragment>;

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

				... on SectionHeaderImageRecord {
					id
					text
					theme
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
						blocks
						links
						value
					}
				}
			}
		}
	`,
	[responsiveImageFragment],
);
export type SectionType = ResultOf<
	typeof pageContentFragment
>["content"][number];
