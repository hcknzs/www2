import { useClientState } from "./use-client-state";

const isSSR = typeof window === "undefined";

const getPrefersReducedMotion = () => {
	if (isSSR) return true;
	const query = "(prefers-reduced-motion: no-preference)";
	const mediaQueryList = window.matchMedia(query);
	const prefersReducedMotion = !mediaQueryList.matches;
	return prefersReducedMotion;
};

export const usePrefersReducedMotion = () =>
	useClientState(getPrefersReducedMotion())[0];
