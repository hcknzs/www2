import { Image, ImagePropTypes } from "react-datocms";
import { ResultOf, graphql } from "~/graphql";

export const responsiveImageFragment = graphql(`
	fragment ResponsiveImage on FileFieldInterface @_unmask {
		data: responsiveImage(imgixParams: { w: 600, auto: format }) {
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

type Props = ResultOf<typeof responsiveImageFragment> & ImagePropTypes;

export const CmsImage: React.FC<Props> = ({ ...rest }) => {
	return <Image {...rest} />;
};

export type ResponsiveImageType = ResultOf<typeof responsiveImageFragment>;
