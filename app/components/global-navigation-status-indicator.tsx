import { cn } from "@peerigon/pupper/tailwind";
import { useIntervalEffect } from "@react-hookz/web";
import { useNavigation } from "@remix-run/react";
import { useMemo, useState } from "react";

export const GlobalNavigationStatusIndicator = () => {
	const [percent, setPercent] = useState(0);

	const { state } = useNavigation();

	const [minPercent, maxPercent] = useMemo(() => {
		if (state === "submitting") {
			return [0, 0.3];
		}

		if (state === "idle") {
			return [0, 0];
		}

		return [0.3, 0.6];
	}, [state]);

	useIntervalEffect(() => {
		if (state === "idle") {
			setPercent(0);
			return;
		}

		if (maxPercent <= minPercent) {
			setPercent(1);
			return;
		}

		const amount = Math.random() * (maxPercent - minPercent);

		setPercent((prev) => amount + Math.max(prev, minPercent));
	}, 3000);

	if (state === "idle") return null;

	return (
		<div
			style={{ width: `${percent * 100}%` }}
			className={cn(
				"fixed top-0 z-50 h-1 bg-teal transition-all duration-500",
			)}
		/>
	);
};
