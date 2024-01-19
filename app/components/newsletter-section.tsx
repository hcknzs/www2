import { Hx } from "uberschrift";
import { Section } from "./misc";

export const NewsletterSection = () => {
	return (
		<Section color="lime" className="text-purple-400">
			<div className="flex gap-12 flex-col lg:flex-row align-middle justify-center max-w-screen-2xl m-auto">
				<div className="lg:text-right gap-2 flex-col flex">
					<Hx className="font-plex-mono font-bold italic text-4xl cursor">
						Interesse?
					</Hx>
					<p className="font-plex-mono tracking-plex-mono pb-2">
						Lass&apos; uns deine E-Mail da und wir melden uns bei
						dir!
					</p>
					<p>
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
				</div>
				<form
					action=""
					className="mt-8 w-auto flex h-12 lg:justify-center align-middle"
				>
					<label htmlFor="email" className="sr-only">
						E-Mail
					</label>
					<input
						type="email"
						name="email"
						id="email"
						className="border-2 border-purple-400 rounded-full px-3 py-2"
						placeholder="mail@example.com"
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						viewBox="0 0 24 24"
						className="w-6 h-6 self-center mx-3"
					>
						<path
							stroke="currentColor"
							d="m21.883 12-7.527 6.235L15 19l9-7.521L15 4l-.645.764L21.884 11H0v1h21.883z"
						/>
					</svg>
					<button
						type="submit"
						className="border border-purple-400 rounded-full px-5 py-1 bg-purple-400 text-white font-plex-mono tracking-plex-mono hover:bg-purple-500 transition-colors"
					>
						Absenden
					</button>
				</form>
			</div>
		</Section>
	);
};
