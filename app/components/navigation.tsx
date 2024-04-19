import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLoaderData, Link } from "@remix-run/react";
import { cn, tw } from "@peerigon/pupper/tailwind";
import { Svg } from "./icons/svg-sprite";
import { Loader } from "../routes/$locale.$slug";
import { TransitionChildPreset } from "./transitions";
import { useString } from "~/i18n";
import { useScrollDepth } from "~/utils/hooks";

const font = tw`font-plex-mono text-3xl font-semibold italic text-white lg:text-6xl`;

export const Navigation = () => {
	const { menuItems } = useLoaderData<Loader>();
	const t = useString();
	const [isOpen, setIsOpen] = useState(false);
	const { currentPage } = useScrollDepth();
	const isInIntroSection = currentPage < 2;

	return (
		<nav
			className={cn(
				`lg:fixed lg:left-2 lg:top-2 lg:z-10`,
				isInIntroSection ? "text-black" : "text-white",
			)}
		>
			<button
				aria-label={t("menu.open")}
				type="button"
				onClick={() => setIsOpen(true)}
				className="flex"
			>
				<Svg
					className={cn(tw`mr-2 block h-8 w-8 fill-current`)}
					name="burger"
				/>
				<Svg
					className={cn(
						tw`block h-8 w-[10.625rem] fill-current transition-all`,
						isInIntroSection ? tw`opacity-100` : tw`opacity-0`,
					)}
					name="menu"
				/>
			</button>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" onClose={() => setIsOpen(false)}>
					<TransitionChildPreset name="fade">
						<div>
							<div className="fixed inset-0 z-20 bg-black/85" />
						</div>
					</TransitionChildPreset>

					<div className="fixed inset-0 z-30 overflow-y-auto">
						<div className="flex min-h-full items-center justify-start p-4 text-center">
							<Dialog.Panel>
								<Dialog.Title as="h3" className="sr-only">
									{t("menu.title")}
								</Dialog.Title>

								<Transition
									appear
									show={isOpen}
									as="div"
									className={`flex min-w-[50vw] flex-col gap-4 text-left ${font}`}
								>
									<TransitionChildPreset name="fade">
										<div>
											<button
												type="button"
												className={cn(font, "sr-only")}
												onClick={() => setIsOpen(false)}
											>
												{t("menu.close")}
											</button>

											<div
												aria-hidden="true"
												className={cn(
													font,
													"pointer-events-none fixed right-5 top-1/2 z-30 -translate-y-1/2 cursor-pointer not-italic",
												)}
												// eslint-disable-next-line react/jsx-no-literals
											>
												⛌
											</div>
										</div>
									</TransitionChildPreset>
									{menuItems.map(
										(
											{ label, to, key, ...rest },
											index,
										) => (
											<TransitionChildPreset
												key={key}
												name="menu.item"
												index={index}
											>
												<Link
													className="block hover:underline"
													to={to}
													onClick={() =>
														setIsOpen(false)
													}
													{...rest}
												>
													{label}
												</Link>
											</TransitionChildPreset>
										),
									)}
								</Transition>
							</Dialog.Panel>
						</div>
					</div>
				</Dialog>
			</Transition>
		</nav>
	);
};
