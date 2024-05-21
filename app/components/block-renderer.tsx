import { StructuredTextPropTypes } from "react-datocms";
import { osMapFragment, OsMap } from "./os-map";
import { Countdown, countdownFragment } from "./countdown";
import { ResultOf } from "~/graphql";

export const renderBlock: StructuredTextPropTypes<
	ResultOf<typeof osMapFragment> | ResultOf<typeof countdownFragment>
>["renderBlock"] = ({ record }) => {
	switch (record.__typename) {
		case "CountdownRecord":
			return <Countdown {...record} />;
		case "MapRecord":
			return <OsMap {...record} />;
		default:
			// @ts-expect-error - This should never happen but in runtime it can
			throw Error(`Unsupported block type: ${record.__typename}`);
	}
};
