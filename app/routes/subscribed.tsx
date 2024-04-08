import Index, { action, meta } from "./_index";

// eslint-disable-next-line canonical/export-specifier-newline
export { action, meta };

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default () => {
	return (
		<>
			<div className="bg-lime-500 text-center font-mono font-bold p-4">
				✨ Danke für deine Anmeldung!
			</div>
			<Index />
		</>
	);
};
