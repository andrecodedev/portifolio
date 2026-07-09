import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { consumeScrollRestore, restoreScrollPosition } from "../utils/returnNavigation";
import { scrollToY } from "../utils/smoothScroll";

const ScrollToTopOnNavigation = () => {
    const { key } = useLocation();

    useEffect(() => {
        const scrollY = consumeScrollRestore();
        if (scrollY !== null) {
            restoreScrollPosition(scrollY);
            return;
        }

        scrollToY(0, false);
    }, [key]);

    return null;
};

export default ScrollToTopOnNavigation;
