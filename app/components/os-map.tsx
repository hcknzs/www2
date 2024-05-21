import { ResultOf, graphql } from "~/graphql";

export const osMapFragment = graphql(`
	fragment Map on MapRecord @_unmask {
		id
		__typename
		location {
			latitude
			longitude
		}
	}
`);

export const OsMap: React.FC<ResultOf<typeof osMapFragment>> = ({
	location,
}) => {
	const bbox = [
		location.longitude - 0.001,
		location.latitude - 0.001,
		location.longitude + 0.001,
		location.latitude + 0.001,
	].join(",");

	const params = new URLSearchParams({
		bbox,
		layer: "transportmap",
		marker: `${location.latitude},${location.longitude}`,
	});

	const url = new URL("/export/embed.html", "https://www.openstreetmap.org");

	return (
		<iframe
			title="Open Street Map"
			width="100%"
			height="420"
			src={`${url.toString()}?${params.toString()}`}
			className="h-96 w-full"
		/>
	);
};
