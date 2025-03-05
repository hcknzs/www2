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

				... on SectionProjectOverviewRecord {
					id
					projects {
						image {
							data: responsiveImage(
								imgixParams: { w: 800, auto: format }
							) {
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

								sizes
							}
						}
						teamName
						description
					}
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

				... on SectionYoutubeRecord {
					id
					poster {
						data: responsiveImage(
							imgixParams: { w: 1280, auto: format }
						) {
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

							sizes
						}
					}
					url {
						provider
						providerUid
					}
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
