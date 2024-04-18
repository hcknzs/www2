import { useFetcher } from "@remix-run/react";
import { TextSection } from "./text-section";
import { Html } from "./html";
import { cn, tw } from "~/utils/tailwind";
import type { ActionData } from "~/routes/$locale.$slug";
import { useString } from "~/i18n";

const SubmitButton: React.FC<{
	isLoading?: boolean;
	onReset?: () => void;
}> = ({ isLoading }) => {
	const t = useString();
	const label = isLoading ? "…" : t("send");
	const className = cn(
		tw`sm:min-w-[10rem] h-12 border border-purple-400 rounded-full px-5 py-1 bg-purple-400 text-white font-plex-mono tracking-plex-mono hover:bg-purple-500 transition-colors"`,
	);

	return (
		<button type="submit" className={className} disabled={isLoading}>
			{label}
		</button>
	);
};

type NewsletterSectionProps = {
	intro?: string;
	instagramLinkText: string;
};

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
	instagramLinkText,
	intro,
}) => {
	const t = useString();
	const { Form, state, data } = useFetcher<ActionData>();
	const isLoading = state === "submitting";
	const isSuccess = data?.isSuccess;

	if (isSuccess) {
		return (
			<TextSection theme="lime" className="text-purple-400">
				<div className="text-center font-plex-mono tracking-plex-mono">
					<p className="text-4xl">{t("newsletter.thanks")}</p>
				</div>
			</TextSection>
		);
	}

	return (
		<TextSection theme="lime" className="text-purple-400">
			<div className="max-w-screen-2xl m-auto flex flex-col gap-8 lg:flex-row justify-center items-middle">
				<div className="lg:text-right font-plex-mono tracking-plex-mono">
					<Html raw={intro} />
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
						className="h-12 border-2 border-purple-400 rounded-full px-3 py-2"
						placeholder="mail@example.com"
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						viewBox="0 0 24 24"
						className="w-6 h-6 rotate-90 sm:rotate-0 self-center mx-3"
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
					className="block leading-none font-plex-mono tracking-plex-mono underline"
					href="https://instagram.com/hck.nzs"
					target="_blank"
					rel="noreferrer"
				>
					{instagramLinkText}
					<img
						className="w-6 h-6 inline"
						src="insta.svg"
						alt="Instagram logo"
					/>{" "}
					{t("newsletter.instagram")}
				</a>
			</p>
		</TextSection>
	);
};
