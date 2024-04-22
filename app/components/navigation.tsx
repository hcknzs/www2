import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLoaderData, Link } from "@remix-run/react";
import { cn, tw } from "@peerigon/pupper/tailwind";
import { Svg } from "./icons/svg-sprite";
import { Loader } from "../routes/$locale.$slug";
import { TransitionChildPreset } from "./transitions";
import { LocaleLink } from "./locale-link";
import { SvgWorld } from "./icons/world";
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
				className="flex"
			>
				<Svg
					className={cn(
						tw`mr-2 block h-8 w-8 fill-current`,
						isOpen && tw`text-white`,
					)}
					name={isOpen ? "burger-close" : "burger"}
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
									className={`flex min-w-[50vw] flex-col gap-2 text-left ${font}`}
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
										index={menuItems.length}
									>
										<span className="mt-8 flex gap-4 uppercase">
											<Svg
												name="world"
												className="relative top-1 h-8 w-8 fill-white"
											/>
											<LocaleLink
												className="block hover:underline"
												onClick={() => setIsOpen(false)}
												isOther
											/>
											<LocaleLink
												className="block hover:underline"
												onClick={() => setIsOpen(false)}
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
