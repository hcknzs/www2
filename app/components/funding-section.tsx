import { Hx } from "uberschrift";
import { Section } from "./section";
import { useString } from "~/i18n";

export const FundingSection = () => {
	const t = useString();

	return (
		<Section theme="white">
			<div className="max-w-screen-sm m-auto">
				<Hx className="sr-only">{t("funding.title")}</Hx>
				<a
					href="https://www.demokratie-leben.de/"
					target="_blank"
					rel="noreferrer"
				>
					<img
						src="/dl.svg"
						alt={t("funding.alt")}
						className="m-auto block"
					/>
				</a>
			</div>
		</Section>
	);
};
