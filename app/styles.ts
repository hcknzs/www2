import { cn, tw } from "./utils/tailwind";

export const prose = cn(
	tw`prose md:prose-xl`,
	tw`prose-strong:text-inherit prose-strong:italic`,
	tw`prose-blockquote:text-inherit prose-blockquote:font-plex-mono prose-blockquote:italic prose-blockquote:tracking-plex-mono `,
	tw`prose-h2:text-inherit prose-h2:font-plex-mono prose-h2:italic prose-h2:tracking-plex-mono prose-h2:beam`,
	tw`prose-h3:text-inherit prose-h3:font-plex-mono prose-h3:italic prose-h3:tracking-plex-mono prose-h3:beam`,
	tw`prose-a:text-inherit`,
);
