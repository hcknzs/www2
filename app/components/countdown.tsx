import { useIntervalEffect } from "@react-hookz/web";
import { ResultOf, graphql } from "~/graphql";
import { useClientState } from "~/utils/use-client-state";

export const countdownFragment = graphql(`
	fragment Countdown on CountdownRecord @_unmask {
		__typename
		id
		datetimeString: datetime
	}
`);

const getDiff = (datetimeString: string) => {
	const then = new Date(datetimeString);
	const seconds = then.getTime() - Date.now();

	const ddhhmmss = {
		days: Math.floor(seconds / (1000 * 60 * 60 * 24)),
		hours: Math.floor((seconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
		minutes: Math.floor((seconds % (1000 * 60 * 60)) / (1000 * 60)),
		seconds: Math.floor((seconds % (1000 * 60)) / 1000),
	};

	return JSON.stringify(ddhhmmss, null, 2);
};

export const Countdown: React.FC<ResultOf<typeof countdownFragment>> = ({
	datetimeString,
}) => {
	const [diff, setDiff] = useClientState(() => getDiff(datetimeString));

	useIntervalEffect(() => {
		setDiff(getDiff(datetimeString));
	}, 1000);

	return <pre>{diff}</pre>;
};
