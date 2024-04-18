import type { ComponentProps } from "react";

export const Html: React.FC<ComponentProps<"div"> & { raw?: string }> = ({
	raw,
	...rest
}) => {
	if (!raw) return null;

	// eslint-disable-next-line react/no-danger
	return <div dangerouslySetInnerHTML={{ __html: raw }} {...rest} />;
};
