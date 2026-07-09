import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { restoreScrollPosition, type PortfolioLocationState } from "../utils/returnNavigation";
import { scrollToY } from "../utils/smoothScroll";

const ScrollToTopOnNavigation = () => {
    const location = useLocation();

    useEffect(() => {
        const restoreScroll = (location.state as PortfolioLocationState | null)?.restoreScroll;

        if (typeof restoreScroll === 'number' && restoreScroll >= 0) {
            restoreScrollPosition(restoreScroll);
            return;
        }

        scrollToY(0, false);
    }, [location.key, location.state]);

    return null;
};

export default ScrollToTopOnNavigation;
