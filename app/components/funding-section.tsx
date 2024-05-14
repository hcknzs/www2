import { Hx } from "uberschrift";
import { Section } from "./section";
import { useString } from "~/i18n";

export const FundingSection = () => {
	const t = useString();

	return (
		<Section theme="white">
			<div className="m-auto flex max-w-screen-sm flex-col gap-16 py-8 lg:gap-32 lg:py-0">
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
				<a
					href="https://www.friedensstadt-augsburg.de/"
					target="_blank"
					rel="noreferrer"
					className="m-auto flex flex-col items-center justify-center gap-8 md:flex-row"
				>
					<img
						src="/ff.svg"
						alt=""
						className="block w-full max-w-[15rem] md:max-w-[24rem]"
					/>
					<img
						src="/fa.jpg"
						alt={t("funding.alt.fa")}
						className="block w-full max-w-[20rem] md:max-w-[32rem]"
					/>
					<img
						src="/augsburg.svg"
						alt=""
						className="block w-full max-w-[20rem] md:max-w-[32rem]"
					/>
				</a>
			</div>
		</Section>
	);
};
