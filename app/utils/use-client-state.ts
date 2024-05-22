import { useEffect, useState } from "react";

export const useClientState = <T = undefined>(initialValue: T | (() => T)) => {
	const [value, setValue] = useState<T | undefined>(undefined);

	useEffect(() => {
		if (initialValue instanceof Function) {
			setValue(initialValue());
			return;
		}

		setValue(initialValue);
	}, [initialValue]);

	return [value, setValue] as const;
};
