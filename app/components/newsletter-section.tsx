import { Hx } from "uberschrift";
import { useFetcher } from "@remix-run/react";
import { Section } from "./misc";
import type { ActionData } from "~/routes/_index";
import { cn, tw } from "~/utils/tailwind";

const SubmitButton: React.FC<{
	isLoading?: boolean;
	isSuccess?: boolean;
	onReset?: () => void;
}> = ({ isLoading, isSuccess, onReset }) => {
	const label = isSuccess
		? "Gesendet! Nochmal?"
		: isLoading
		? "…"
		: "Absenden";
	const className = cn(
		tw`sm:min-w-[10rem] h-12 border border-purple-400 rounded-full px-5 py-1 bg-purple-400 text-white font-plex-mono tracking-plex-mono hover:bg-purple-500 transition-colors"`
	);

	return (
		<button
			type={isSuccess ? "button" : "submit"}
			className={className}
			disabled={isLoading}
			onClick={isSuccess ? onReset : undefined}
		>
			{label}
		</button>
	);
};

export const NewsletterSection = () => {
	const { Form, state, data } = useFetcher<{ error: string | null }>();
	const isLoading = state === "submitting";

	return (
		<Section color="lime" className="text-purple-400">
			<div className="max-w-screen-2xl m-auto flex flex-col gap-8 lg:flex-row justify-center items-middle">
				<div className="lg:text-right font-plex-mono tracking-plex-mono">
					<Hx className="font-bold italic text-3xl">Interesse?</Hx>
					<p className="">
						Lass&apos; uns deine E-Mail da und wir melden uns bei
						dir!
					</p>
				</div>
				<Form
					method="post"
					action="/?index"
					className="flex flex-col gap-4 sm:flex-row sm:gap-0 lg:pt-3"
				>
					<label htmlFor="email" className="sr-only">
						E-Mail
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
					<SubmitButton isSuccess={isSuccess} isLoading={isLoading} />
				</Form>
			</div>
			<p className="mt-8 text-center sm:text-left lg:text-center">
				<a
					className="block leading-none font-plex-mono tracking-plex-mono underline"
					href="https://instagram.com/hck.nzs"
					target="_blank"
					rel="noreferrer"
				>
					Oder folge uns auf{" "}
					<img
						className="w-6 h-6 inline"
						src="insta.svg"
						alt="Instagram logo"
					/>{" "}
					Instagram!
				</a>
			</p>
		</Section>
	);
};
