import { Transition } from "@headlessui/react";
import type { TransitionClasses } from "@headlessui/react";
import { tw } from "@peerigon/pupper/tailwind";
import { ReactNode, useMemo } from "react";
import { Fragment } from "react/jsx-runtime";

type Preset = TransitionClasses | ((index: number) => TransitionClasses);

const presets = {
	fade: {
		enter: tw`duration-300 ease-in`,
		enterFrom: tw`opacity-0`,
		enterTo: tw`opacity-100`,
		leave: tw`duration-400 ease-in`,
		leaveFrom: tw`opacity-100`,
		leaveTo: tw`opacity-0`,
	},

	"menu.item": (index) => {
		const delayClasses = [
			"delay-[100ms]",
			"delay-[200ms]",
			"delay-[300ms]",
			"delay-[400ms]",
			"delay-[500ms]",
			"delay-[600ms]",
			"delay-[700ms]",
		];

		const thisDelay =
			delayClasses[Math.min(index, delayClasses.length - 1)];

		return {
			enter: tw`${thisDelay} duration-300 ease-out`,
			enterFrom: tw`-translate-x-1/2 opacity-0`,
			enterTo: tw`translate-x-0 opacity-100`,
			leave: tw`${thisDelay} duration-200 ease-in`,
			leaveFrom: tw`translate-x-0 opacity-100`,
			leaveTo: tw`-translate-x-1/2 opacity-0`,
		};
	},

	"menu.panel": {
		enter: tw`duration-300 ease-out`,
		enterFrom: tw`scale-95 opacity-0`,
		enterTo: tw`scale-100 opacity-100`,
		leave: tw`delay 1000 duration-200 ease-in`,
		leaveFrom: tw`scale-100 opacity-100`,
		leaveTo: tw`scale-95 opacity-0`,
	},
} as const satisfies Record<string, Preset>;

export const TransitionChildPreset = ({
	index,
	name,
	children,
	...rest
}: {
	index?: number;
	name: keyof typeof presets;
	children: ReactNode;
}) => {
	const preset = useMemo(() => {
		let preset = presets[name];

		if (typeof preset === "function") {
			if (typeof index !== "number") {
				throw new Error(
					`Index is required for transition preset "${name}"`,
				);
			}

			preset = preset(index);
		}
		return preset;
	}, [index, name]);

	return (
		<Transition.Child as={Fragment} {...preset} {...rest}>
			{children}
		</Transition.Child>
	);
};
