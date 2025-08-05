import { useCallback, useEffect, useState } from "react";

export const useWheel = <T extends HTMLElement>() => {
    const [scrollElement, setScrollElement] = useState<T | null>(null);

    const scrollRefCallback = useCallback((node: T | null) => {
        if (node) {
            setScrollElement(node);
        }
    }, []);

    useEffect(() => {
        if (!scrollElement) return;

        const handleWheel = (event: WheelEvent) => {
            // Hijack vertical scroll for horizontal movement
            // scrollElement.scrollTo({
            //     left: scrollElement.scrollLeft + event.deltaY,
            //     behavior: 'smooth',
            // });
            scrollElement.scrollLeft += event.deltaY;
            event.preventDefault();
        };

        scrollElement.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            scrollElement.removeEventListener('wheel', handleWheel);
        };
    }, [scrollElement]);

    return scrollRefCallback;
};