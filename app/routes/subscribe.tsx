import Index, { action, meta } from "./_index";
import { NewsletterSection } from "~/components/newsletter-section";

// eslint-disable-next-line canonical/export-specifier-newline
export { action, meta };

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default () => {
	return (
		<>
			<NewsletterSection />
			<Index />
		</>
	);
};
