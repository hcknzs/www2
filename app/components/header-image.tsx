import { Image } from "react-datocms";
import { cn } from "@peerigon/pupper/tailwind";
import { getTheme } from "./section";
import type { ResponsiveImageType } from "~/fragments";

export const HeaderImage: React.FC<{
	image: ResponsiveImageType;
	text: string | null;
	theme: string | null;
}> = ({ text, image, theme }) => {
	if (!image.responsiveImage) {
		return null;
	}

	return (
		<div
			className={cn(
				"flex flex-col items-start justify-stretch gap-8 p-4 lg:flex-row xl:items-end",
				getTheme(theme ?? "teal"),
			)}
		>
			<Image
				className=""
				data={image.responsiveImage}
				usePlaceholder={false}
				style={{ maxWidth: undefined, width: undefined }}
				objectFit="contain"
				pictureClassName="flex-1 w-1/2"
			/>
			<div className="flex-1 md:w-1/2">
				<p className="font-plex-mono text-xl text-white md:text-3xl lg:text-4xl">
					<span className="bg-white leading-normal text-purple">
						{text}
					</span>
				</p>
			</div>
		</div>
	);
};
