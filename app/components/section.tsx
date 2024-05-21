import type { ComponentProps } from "react";
import { cn, tw } from "@peerigon/pupper/tailwind";
import { useString } from "~/i18n";
import { prose } from "~/styles";
import { slc } from "~/utils/components";

const themes = {
	black: tw`bg-black text-white`,
	disrupt: tw`text-md bg-black text-center font-plex-mono tracking-plex-mono text-white lg:text-xl`,
	lime: tw`bg-lime text-black`,
	purple: tw`bg-purple-400 text-white`,
	red: tw`bg-red text-black`,
	teal: tw`bg-teal-300 text-white`,
	white: tw`bg-white text-black`,
};

export const isTheme = (color: string): color is keyof typeof themes =>
	color in themes;

export const getTheme = (name: string) =>
	isTheme(name) ? themes[name] : themes.red;

export const Section: React.FC<
	ComponentProps<"div"> & {
		anchor?: string;
		index?: number;
		innerClassName?: string;
		theme?: keyof typeof themes;
	}
> = ({
	theme = "red",
	className,
	innerClassName,
	children,
	anchor,
	index,
	...rest
}) => {
	const t = useString();

	const isFirst = index === 0;

	return (
		<section
			id={anchor}
			className={cn(
				themes[theme],
				tw`relative flex flex-col flex-nowrap px-5 py-8`,
				isFirst && "py-16",
				className,
			)}
			{...rest}
		>
			{anchor && (
				<a
					className="mb-6 block w-fit emoji-white lg:sticky lg:top-4 lg:mb-0 lg:self-end"
					aria-label={t("anchor")}
					href={`#${anchor}`}
				>
					{
						// this comment is here so eslint shuts up
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
