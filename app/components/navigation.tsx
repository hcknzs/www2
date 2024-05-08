import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLoaderData, Link } from "@remix-run/react";
import { cn, tw } from "@peerigon/pupper/tailwind";
import { Svg } from "./icons/svg-sprite";
import { Loader } from "../routes/$locale.$slug";
import { TransitionChildPreset } from "./transitions";
import { LocaleLink } from "./locale-link";
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
				`fixed left-2 top-2 z-40`,
				isInIntroSection ? "text-black" : "text-white",
			)}
		>
			<button
				aria-label={t("menu.open")}
				type="button"
				onClick={() => setIsOpen(true)}
				className={cn(
					"flex cursor-pointer",
					"relative before:absolute before:z-[-1] before:contents before:rounded-b-full before:rounded-r-full before:bg-purple before:transition-transform",
					"before:-left-9 before:-top-9 before:size-20 before:-translate-x-10 before:-translate-y-10",
					"before:-translate-x-14 before:-translate-y-14 md:before:-left-10 md:before:-top-10 md:before:size-24",

					!isInIntroSection &&
						"before:translate-x-0 before:translate-y-0",
				)}
			>
				<Svg
					className={cn(
						tw`relative z-50 mr-1 block h-6 w-6 fill-current md:mr-2 md:h-8 md:w-8`,
						isOpen && tw`text-white`,
					)}
					name={isOpen ? "burger-close" : "burger"}
				/>
				<Svg
					className={cn(
						tw`block h-6 w-[8rem] fill-current transition-all md:h-8 md:w-[10.625rem]`,
						isInIntroSection ? tw`opacity-100` : tw`opacity-0`,
						isOpen && tw`invisible`,
					)}
					name="menu"
				/>
			</button>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" onClose={() => setIsOpen(false)}>
					<TransitionChildPreset name="fade">
						<div>
							<div className="fixed inset-0 z-20 bg-black/95" />
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
									className={`flex min-w-[50vw] flex-col items-start gap-[0.25em] text-left ${font}`}
								>
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
									<TransitionChildPreset
										name="menu.item"
										index={menuItems.length + 1}
									>
										<span className="mt-8 flex gap-[0.25em] uppercase">
											<LocaleLink
												onClick={() => setIsOpen(false)}
												isOther
											/>
											<LocaleLink
												onClick={() => setIsOpen(false)}
											/>
											<Svg
												name="world"
												className="relative top-[0.125em] aspect-square h-[0.75em] fill-white"
											/>
										</span>
									</TransitionChildPreset>
								</Transition>
							</Dialog.Panel>
						</div>
					</div>
				</Dialog>
			</Transition>
		</nav>
	);
};
