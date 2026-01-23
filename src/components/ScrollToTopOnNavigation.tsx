import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopOnNavigation = () => {
    const { key } = useLocation();

    useEffect(() => {
        // Quando qualquer navegação ocorre (mesmo para o mesmo path), rola para o topo
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [key]);

    return null;
};

export default ScrollToTopOnNavigation;
