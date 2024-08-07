import { createContext, useEffect, useState } from "react";
import { getTheme, ThemeName } from "../style/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";
import ThemeSwitcher from "../components/header/ThemeSwitcher";

const DEFAULT_THEME = "light";
const THEME_LOCAL_STORAGE_KEY = "theme";

interface State {
    themeName: ThemeName;
    toggleTheme: () => void;
}

export const state: State = {
    themeName: "light",
    toggleTheme: () => {}
};

export const ThemeContext = createContext<State>(state);

export const BookStoreThemeProvider = ({children}: {children: React.ReactNode}) => {
    const [themeName, setThemeName] = useState<ThemeName>("light");

    const toggleTheme = () => {
        setThemeName(themeName === "light" ? "dark" : "light");
        localStorage.setItem(THEME_LOCAL_STORAGE_KEY, themeName === "light" ? "dark" : "light");
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY) as ThemeName;
        setThemeName(savedTheme || DEFAULT_THEME);
    }, []);

    return (
        <ThemeContext.Provider value={{themeName, toggleTheme}}>
            <ThemeProvider theme={getTheme(themeName)}>
            <ThemeSwitcher/>
            <GlobalStyle themeName={themeName} />
            {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}