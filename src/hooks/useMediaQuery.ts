import { useState } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useIsomorphicLayoutEffect(() => {
        const mediaQueryList = window.matchMedia(query);

        // Update state when the media query status changes
        const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
        mediaQueryList.addEventListener("change", listener);

        // Clean up event listener on component unmount
        return () => mediaQueryList.removeEventListener("change", listener);
    }, [query]);

    return matches;
}
