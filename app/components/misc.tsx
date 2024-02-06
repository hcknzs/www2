import { HTMLProps } from "react";
import { prose } from "~/styles";
import { slc } from "~/utils/components";
import { cn, tw } from "~/utils/tailwind";

export const Section: React.FC<
	HTMLProps<HTMLDivElement> & {
		anchor?: string;
		color?: "red" | "teal" | "purple" | "black" | "lime";
	}
> = ({ color, className, children, anchor, ...rest }) => {
	const themes = {
		black: tw`bg-black text-white`,
		lime: tw`bg-lime text-black`,
		purple: tw`bg-purple-400 text-black`,
		red: tw`bg-red text-black`,
		teal: tw`bg-teal-300 text-white`,
	};

	return (
		<section
			id={anchor}
			className={cn(className, themes[color ?? "red"], tw`relative p-8`)}
			{...rest}
		>
			{anchor && (
				<a
					className="xl:sticky left-4 top-4 emoji-white"
					aria-label="Direktlink zu diesem Abschnitt"
					href={`#${anchor}`}
				>
					⚓
				</a>
			)}
			<div className="lg:py-16">{children}</div>
		</section>
	);
};

export const makeSectionInner = (classNames?: string) =>
	slc("div", cn(tw`max-w-screen-md m-auto`, classNames));

export const SectionInner = makeSectionInner();
export const ProseWrapper = makeSectionInner(cn(prose, "text-white"));
