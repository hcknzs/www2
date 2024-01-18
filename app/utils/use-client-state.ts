import { useEffect, useState } from "react";

export const useClientState = <T>(initialValue: T, delay = 1) => {
	const [value, setValue] = useState<T | undefined>(undefined);

	useEffect(() => setValue(initialValue), [initialValue]);

	return [value, setValue];
};
