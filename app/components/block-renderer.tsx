import { StructuredTextPropTypes } from "react-datocms";
import { osMapFragment, OsMap } from "./os-map";
import { ResultOf } from "~/graphql";

type OsMapType = ResultOf<typeof osMapFragment>;

export const renderBlock: StructuredTextPropTypes<OsMapType>["renderBlock"] = ({
	record,
}) => {
	switch (record.__typename) {
		case "MapRecord":
			return <OsMap {...record} />;
		default:
			throw Error(`Unsupported block type: ${record.__typename}`);
	}
};
