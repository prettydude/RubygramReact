import classNames from "classnames";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useComponentWillMount } from "../utils/hooks";
import "./Theme.scss";

const ANIMATION_TIME = 800;

const DEFAULT_CHANGE_FUNCTION = (newTheme, x, y) => {
    console.log("Don't call theme change before init!");
    return false;
};

export const ThemeContext = createContext({
    theme: "dark",
    initiateChange: DEFAULT_CHANGE_FUNCTION
});

const ThemeWrapper = ({ setInitiateChange, setTheme, children }) => {
    const themeContext = useContext(ThemeContext);

    const ref = useRef(null);

    const [animating, setAnimating] = useState(false);

    const toggleChange = (nextTheme, x, y) => {
        setAnimating(true);

        const themeable = ref.current;
        if(!themeable) return false;

        const clone = themeable.cloneNode(true);
        clone.classList.add("dummy");
        window.document.body.appendChild(clone);

        setTheme(nextTheme);

        let animationStart = Date.now();

        const animate = () => {
            let percent = (Date.now() - animationStart) / ANIMATION_TIME; // 0 - 1
            if(percent > 1) {
                clone.remove();
                setAnimating(false);
                return;
            }
            const goingTo = 150;

            let gradientString = `radial-gradient(circle farthest-side at ${x}px ${y}px, transparent ${percent*goingTo}%, white ${percent*goingTo + 1}%)`;
            clone.style.webkitMaskImage = gradientString;
            clone.style.maskImage = gradientString;

            window.requestAnimationFrame(animate);
        }

        animate();
        
        return true;
    }

    useEffect(() => {
        setTimeout(() => setInitiateChange(() => (newTheme, x, y) => {
            if(animating) return false;
            toggleChange(newTheme, x, y);
            return true;
        }));
    }, [animating]);

    return (
        <div className={classNames({
            "theme": true,
            [themeContext.theme]: true,
            animating: animating
        })} ref={ref}>
            {children}
        </div>
    )
}

const ContextWrapper = ({children}) => {
    useComponentWillMount(() => {
        !localStorage.getItem("theme") && localStorage.setItem("theme", (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "light");
    })

    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const [initiateChange, setInitiateChange] = useState(() => DEFAULT_CHANGE_FUNCTION);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, initiateChange }}>
            <ThemeWrapper setInitiateChange={setInitiateChange} setTheme={setTheme}>
                {children}
            </ThemeWrapper>
        </ThemeContext.Provider>
    )
}

export default ContextWrapper;
