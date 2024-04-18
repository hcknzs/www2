import type { HTMLProps } from "react";
import { useString } from "~/i18n";
import { prose } from "~/styles";
import { slc } from "~/utils/components";
import { cn, tw } from "~/utils/tailwind";

const themes = {
	black: tw`bg-black text-white`,
	disrupt: tw`bg-black text-white font-plex-mono tracking-plex-mono text-md lg:text-xl text-center`,
	lime: tw`bg-lime text-black`,
	purple: tw`bg-purple-400 text-black`,
	red: tw`bg-red text-black`,
	teal: tw`bg-teal-300 text-white`,
	white: tw`bg-white text-black`,
};

export const isTheme = (color: string): color is keyof typeof themes =>
	color in themes;

export const Section: React.FC<
	HTMLProps<HTMLDivElement> & {
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
					className="xl:sticky left-4 top-4 emoji-white"
					aria-label={t("anchor")}
					href={`#${anchor}`}
				>
					⚓
				</a>
			)}
			<div className={cn(innerClassName, "lg:py-16")}>{children}</div>
		</section>
	);
};

const makeSectionInner = (classNames?: string) =>
	slc("div", cn(tw`max-w-screen-md m-auto`, classNames));

export const SectionInner = makeSectionInner();
export const ProseWrapper = makeSectionInner(cn(prose, "text-white"));
