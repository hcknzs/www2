import { cn } from "@peerigon/pupper/tailwind";
import { CmsImage, ResponsiveImageType } from "./cms-image";

export const ImageHeader: React.FC<{
	image: ResponsiveImageType;
	text: string | null;
	color: { hex: string } | null;
}> = ({ text, image, color }) => {
	if (!image.data) {
		return null;
	}

	return (
		<div
			className={cn("px-4 py-16 lg:px-12 lg:py-32")}
			style={{ background: color?.hex }}
		>
			<div className="m-auto flex max-w-screen-2xl flex-col items-start justify-stretch gap-4 lg:flex-row lg:items-end lg:gap-8 [&>*]:xl:w-1/2">
				<CmsImage className="w-full" data={image.data} />
				<p className="font-plex-mono text-xl text-white md:text-3xl lg:text-4xl">
					<span className="bg-white leading-normal text-black">
						{text}
					</span>
				</p>
			</div>
		</div>
	);
};
