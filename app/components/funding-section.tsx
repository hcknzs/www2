/* eslint-disable react/jsx-no-literals */
import { Hx } from "uberschrift";
import { Section } from "./section";
import { useString } from "~/i18n";

export const FundingSection = () => {
	const t = useString();

	return (
		<Section theme="white">
			<div className="m-auto flex max-w-screen-md flex-col gap-16 py-8 lg:py-0">
				<Hx className="sr-only">{t("funding.title")}</Hx>
				<a
					href="https://www.demokratie-leben.de/"
					target="_blank"
					rel="noreferrer"
				>
					<img
						src="/dl.svg"
						alt={t("funding.alt.dl")}
						className="m-auto block w-full max-w-[36rem]"
					/>
				</a>
				<p className="text-center text-sm text-gray-500">
					Die Veröffentlichung stellt keine Meinungsäußerung des
					BMFSFJ oder des BAFzA dar.
					<br />
					Für inhaltliche Aussagen tragen die Autorinnen und Autoren
					die Verantwortung.
				</p>
				<a
					href="https://www.friedensstadt-augsburg.de/"
					target="_blank"
					rel="noreferrer"
					className="flex flex-col items-center justify-center gap-12 md:flex-row md:gap-4"
				>
					<img
						src="/ff.svg"
						alt=""
						className="max-w-[66%] sm:max-w-[50%] md:max-w-[29%]"
					/>
					<img
						src="/fa.jpg"
						alt={t("funding.alt.fa")}
						className="max-w-[66%] sm:max-w-[50%] md:max-w-[32%]"
					/>
					<img
						src="/augsburg.svg"
						alt=""
						className="max-w-[66%] sm:max-w-[50%] md:max-w-[39%]"
					/>
				</a>
			</div>
		</Section>
	);
};
