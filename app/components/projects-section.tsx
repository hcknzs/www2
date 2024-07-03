import { Hx, HxBoundary } from "uberschrift";
import { cn } from "@peerigon/pupper/tailwind";
import { colorThemeKeys, themes } from "./section";
import { CmsImage } from "./cms-image";
import { useString } from "~/i18n";
import { prose } from "~/styles";

type Project = {
	description: string;
	teamName: string;
	image: any;
};

export const ProjectsSection: React.FC<{ projects: Array<Project> }> = ({
	projects,
}) => {
	const t = useString();

	return (
		<div>
			<Hx className="sr-only">{t("projects-title")}</Hx>
			<div className="m-auto flex flex-row flex-wrap justify-center">
				<HxBoundary>
					{projects.map(({ description, image, teamName }, index) => {
						const themeColor =
							colorThemeKeys[index % colorThemeKeys.length];
						if (!themeColor) {
							return null;
						}

						const themeClasses = themes[themeColor];

						return (
							<div
								key={teamName}
								className={cn(
									"w-full p-4 md:w-1/2 lg:p-12 2xl:w-full 3xl:w-1/2",

									themeClasses,
								)}
							>
								<div className="items-start 2xl:flex 2xl:gap-8">
									<CmsImage
										objectFit="cover"
										className="mb-6 aspect-square w-full max-w-none basis-1/3 2xl:mt-2"
										layout="fixed"
										style={{ width: "100%" }}
										data={image.data}
									/>

									<div
										className={cn(
											prose,
											"text-sm tracking-plex-mono prose-strong:font-plex-mono prose-strong:no-underline",
											"max-w-full basis-2/3 text-inherit",
										)}
									>
										<Hx>{teamName}</Hx>
										<div
											// eslint-disable-next-line react/no-danger
											dangerouslySetInnerHTML={{
												__html: description,
											}}
										/>
									</div>
								</div>
							</div>
						);
					})}
				</HxBoundary>
			</div>
		</div>
	);
};
