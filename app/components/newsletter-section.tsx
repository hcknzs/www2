import { useFetcher } from "@remix-run/react";
import { Hx } from "uberschrift";
import { cn, tw } from "@peerigon/pupper/tailwind";
import { Section } from "./section";
import type { ActionData } from "~/routes/$locale.$slug";
import { useString } from "~/i18n";

const SubmitButton: React.FC<{
	isLoading?: boolean;
	onReset?: () => void;
}> = ({ isLoading }) => {
	const t = useString();
	const label = isLoading ? "…" : t("send");
	const className = cn(
		tw`transition-colors" h-12 rounded-full border border-purple-400 bg-purple-400 px-5 py-1 font-plex-mono tracking-plex-mono text-white hover:bg-purple-500 sm:min-w-[10rem]`,
	);

	return (
		<button type="submit" className={className} disabled={isLoading}>
			{label}
		</button>
	);
};

type NewsletterSectionProps = {
	title: string;
	subline: string;
	instagramLinkText: string;
};

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
	instagramLinkText,
	title,
	subline,
}) => {
	const t = useString();
	const { Form, state, data } = useFetcher<ActionData>();
	const isLoading = state === "submitting";
	const isSuccess = data?.isSuccess;

	if (isSuccess) {
		return (
			<Section theme="lime" className="text-purple-400">
				<div className="text-center font-plex-mono tracking-plex-mono">
					<p className="text-4xl">{t("newsletter.thanks")}</p>
				</div>
			</Section>
		);
	}

	return (
		<Section theme="lime" className="text-purple-400">
			<div className="items-middle m-auto flex max-w-screen-2xl flex-col justify-center gap-8 lg:flex-row">
				<div className="font-plex-mono tracking-plex-mono lg:text-right">
					<Hx className="text-3xl font-bold italic">{title}</Hx>
					<p>{subline}</p>
				</div>
				<Form
					method="POST"
					action="/?index"
					className="flex flex-col gap-4 sm:flex-row sm:gap-0 lg:pt-3"
				>
					<label htmlFor="email" className="sr-only">
						{t("newsletter.email")}
					</label>
					<input
						type="email"
						name="email"
						id="email"
						className="h-12 rounded-full border-2 border-purple-400 px-3 py-2"
						placeholder="mail@example.com"
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						viewBox="0 0 24 24"
						className="mx-3 h-6 w-6 rotate-90 self-center sm:rotate-0"
					>
						<path
							stroke="currentColor"
							d="m21.883 12-7.527 6.235L15 19l9-7.521L15 4l-.645.764L21.884 11H0v1h21.883z"
						/>
					</svg>
					<SubmitButton isLoading={isLoading} />
				</Form>
			</div>
			<p className="mt-8 text-center sm:text-left lg:text-center">
				<a
					className="block font-plex-mono leading-none tracking-plex-mono underline"
					href="https://instagram.com/hck.nzs"
					target="_blank"
					rel="noreferrer"
				>
					{instagramLinkText}{" "}
					<img
						className="inline h-6 w-6"
						src="/insta.svg"
						alt="Instagram logo"
					/>{" "}
					{t("newsletter.instagram")}
				</a>
			</p>
		</Section>
	);
};
