import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { consumeScrollRestore } from "../utils/returnNavigation";

const ScrollToTopOnNavigation = () => {
    const { key } = useLocation();

    useEffect(() => {
        const scrollY = consumeScrollRestore();
        if (scrollY !== null) {
            const restore = () => {
                window.scrollTo({
                    top: scrollY,
                    behavior: "instant",
                });
            };

            requestAnimationFrame(() => {
                requestAnimationFrame(restore);
            });
            return;
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [key]);

    return null;
};

export default ScrollToTopOnNavigation;
