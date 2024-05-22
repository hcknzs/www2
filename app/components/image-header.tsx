import { cn } from "@peerigon/pupper/tailwind";
import { CmsImage, ResponsiveImageType } from "./cms-image";
import { replacePipeWithBr } from "~/i18n";

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
			className={cn("px-4 py-8 pt-16 md:px-12 md:pt-32")}
			style={{ background: color?.hex }}
		>
			<div className="m-auto flex max-w-screen-md flex-col justify-stretch gap-4 md:flex-row md:items-end md:gap-8">
				<CmsImage
					objectFit="contain"
					className="m-auto max-h-[12rem] w-full md:max-h-[24rem] "
					data={image.data}
				/>
				<p className="w-full hyphens-auto px-0 text-center font-plex-mono text-xl text-white sm:px-12 md:px-0 md:text-left md:text-4xl">
					<span className="bg-white leading-normal text-black">
						{replacePipeWithBr(text ?? "")}
					</span>
				</p>
			</div>
		</div>
	);
};
