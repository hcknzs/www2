import type { ComponentProps } from "react";
import { useString } from "~/i18n";
import { prose } from "~/styles";
import { slc } from "~/utils/components";
import { cn, tw } from "~/utils/tailwind";

const themes = {
	black: tw`bg-black text-white`,
	disrupt: tw`text-md bg-black text-center font-plex-mono tracking-plex-mono text-white lg:text-xl`,
	lime: tw`bg-lime text-black`,
	purple: tw`bg-purple-400 text-black`,
	red: tw`bg-red text-black`,
	teal: tw`bg-teal-300 text-white`,
	white: tw`bg-white text-black`,
};

export const isTheme = (color: string): color is keyof typeof themes =>
	color in themes;

export const Section: React.FC<
	ComponentProps<"div"> & {
		anchor?: string;
		innerClassName?: string;
		theme?: keyof typeof themes;
	}
> = ({
	theme = "red",
	className,
	innerClassName,
	children,
	anchor,
	...rest
}) => {
	const t = useString();
	return (
		<section
			id={anchor}
			className={cn(className, themes[theme], tw`relative p-8`)}
			{...rest}
		>
			{anchor && (
				<a
					className="left-4 top-4 emoji-white xl:sticky"
					aria-label={t("anchor")}
					href={`#${anchor}`}
				>
					{
						// this comment is here to eslint shuts up
						"⚓"
					}
				</a>
			)}
			<div className={cn(innerClassName, "lg:py-16")}>{children}</div>
		</section>
	);
};

const makeSectionInner = (classNames?: string) =>
	slc("div", cn(tw`m-auto max-w-screen-md`, classNames));

export const SectionInner = makeSectionInner();
export const ProseWrapper = makeSectionInner(cn(prose, "text-white"));
