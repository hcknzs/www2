import { cn, tw } from "@peerigon/pupper/tailwind";

export const prose = cn(
	tw`prose md:prose-xl`,
	tw`prose-blockquote:font-plex-mono prose-blockquote:italic prose-blockquote:tracking-plex-mono prose-blockquote:text-inherit `,
	tw`prose-h2:font-plex-mono prose-h2:italic prose-h2:tracking-plex-mono prose-h2:text-inherit prose-h2:beam`,
	tw`prose-h3:font-plex-mono prose-h3:italic prose-h3:tracking-plex-mono prose-h3:text-inherit prose-h3:beam`,
	tw`prose-a:text-inherit`,
	tw`prose-strong:font-normal prose-strong:text-inherit`,
	tw`prose-strong:underline prose-strong:decoration-red prose-strong:decoration-wavy prose-strong:underline-offset-[0.33em]`,
	tw`prose-pre:bg-teal-100`,
);
