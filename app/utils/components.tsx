// A "Simple Layout Component" ™️ is a React.FC with children and classNames

import { cn } from "./tailwind";

type SLC<P = object> = React.FC<
	{
		children?: React.ReactNode;
		className?: string;
	} & P
>;

// … and here's a factory function for creating them easily.
const getSimpleLayoutComponent =
	(
		As: React.ElementType,
		baseClassName: string,
		baseChildren?: React.ReactNode,
	): SLC =>
	// eslint-disable-next-line react/display-name
	({ children, className }) => (
		<As className={cn(baseClassName, className)}>
			{children ?? baseChildren}
		</As>
	);

// … and here's a shorthand for it.
// e.g. slc("div", tw`max-w-container m-auto`);
export const slc = getSimpleLayoutComponent;
