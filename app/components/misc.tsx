import { HTMLProps } from "react";
import { prose } from "~/styles";
import { slc } from "~/utils/components";
import { cn, tw } from "~/utils/tailwind";

export const Section: React.FC<
	HTMLProps<HTMLDivElement> & {
		color?: "red" | "teal" | "purple" | "black" | "lime";
	}
> = ({ color, className, ...rest }) => {
	const themes = {
		black: tw`bg-black text-white`,
		lime: tw`bg-lime text-black`,
		purple: tw`bg-purple-400 text-black`,
		red: tw`bg-red text-black`,
		teal: tw`bg-teal-300 text-white`,
	};

	return (
		<section
			className={cn(
				className,
				themes[color ?? "red"],
				tw`px-8 py-8 lg:py-24 relative`
			)}
			{...rest}
		/>
	);
};

export const makeSectionInner = (classNames?: string) =>
	slc("div", cn(tw`max-w-screen-md m-auto`, classNames));

export const SectionInner = makeSectionInner();
export const ProseWrapper = makeSectionInner(cn(prose, "text-white"));
