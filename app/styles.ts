import { cn, tw } from "./utils/tailwind";

export const prose = cn(
	tw`prose md:prose-xl`,
	tw`prose-h2:font-plex-mono prose-h2:italic prose-h2:tracking-plex-mono prose-h2:text-[var(--em-color)] prose-h2:cursor`,
	tw`prose-h3:font-plex-mono prose-h3:italic prose-h3:tracking-plex-mono prose-h3:text-[var(--em-color)] prose-h3:cursor`
);
