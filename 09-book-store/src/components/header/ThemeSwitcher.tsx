import { ThemeName } from "../../style/theme";

interface Props {
    themeName: ThemeName;
    setThemeName: (themeName: ThemeName) => void;
}

function ThemeSwitcher({ themeName, setThemeName }: Props) {
    const toggleThemeName = () => {
        setThemeName(themeName === "light" ? "dark" : "light");
    }

    return <button onClick={toggleThemeName}>{themeName}</button>;
}

export default ThemeSwitcher;
