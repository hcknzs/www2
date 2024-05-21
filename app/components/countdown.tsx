import { useIntervalEffect } from "@react-hookz/web";
import { useState } from "react";
import { ResultOf, graphql } from "~/graphql";

export const countdownFragment = graphql(`
	fragment Countdown on CountdownRecord @_unmask {
		__typename
		id
		datetimeString: datetime
	}
`);

export const Countdown: React.FC<ResultOf<typeof countdownFragment>> = ({
	datetimeString,
}) => {
	const getDiff = () => {
		const then = new Date(datetimeString);
		const seconds = then.getTime() - Date.now();

		const ddhhmmss = {
			days: Math.floor(seconds / (1000 * 60 * 60 * 24)),
			hours: Math.floor(
				(seconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			),
			minutes: Math.floor((seconds % (1000 * 60 * 60)) / (1000 * 60)),
			seconds: Math.floor((seconds % (1000 * 60)) / 1000),
		};

		return JSON.stringify(ddhhmmss, null, 2)
			.replace(/\n/g, "")
			.replace(/ {2}/g, " ");
	};

	const [diff, setDiff] = useState(getDiff);

	useIntervalEffect(() => {
		setDiff(getDiff());
	}, 1000);

	return <pre>{diff}</pre>;
};
