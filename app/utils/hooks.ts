import {
	useDebouncedCallback,
	useEventListener,
	useResizeObserver,
	useWindowSize,
} from "@react-hookz/web";
import { useEffect, useState } from "react";

const useScrollY = () => {
	const [scrollY, setScrollY] = useState(0);
	const win = typeof window === "undefined" ? null : window;

	const debouncedCallback = useDebouncedCallback(
		() => {
			setScrollY(window.scrollY);
		},
		[setScrollY],
		100,
	);

	useEventListener(win, "scroll", debouncedCallback, { passive: true });
	useEffect(debouncedCallback, [debouncedCallback]);

	return scrollY;
};

const useBodySize = () => {
	const [rect, setRect] = useState<DOMRectReadOnly>();

	const debouncedCallback = useDebouncedCallback(
		(e) => {
			setRect(e.contentRect);
		},
		[setRect],
		100,
	);

	useResizeObserver(
		typeof document === "undefined"
			? { current: null }
			: { current: document.body },
		debouncedCallback,
	);
	return { rect };
};

export const useScrollDepth = () => {
	const { rect } = useBodySize();
	const y = useScrollY();
	const { height: vpHeight } = useWindowSize();

	if (typeof window === "undefined") {
		return {
			currentPage: 1,
			pages: 1,
			progress: 0,
		};
	}

	const bodyHeight = rect?.height ?? 0;
	const maxY = bodyHeight - vpHeight;

	const pages = Math.round(bodyHeight / vpHeight);
	const currentPage = Math.round(y / vpHeight) + 1;

	const progress = y / maxY;

	return {
		currentPage,
		pages,
		progress,
	};
};
