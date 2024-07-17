export type ThemeName = "light" | "dark";
export type ColorKey = "primary" | "background" | "secondary" | "third";

interface Theme {
    name: ThemeName;
    color: Record<ColorKey, string>;
    heading: {
        [key in HeadingSize]: {
            fontSize: string;
        };
    };
}

export type HeadingSize = "small" | "medium" | "large";

export const light: Theme = {
    name: "light",
    color: {
        primary: "brown",
        background: "lightgray",
        secondary: "blue",
        third: "green",
    },
    heading: {
        small: {
            fontSize: "1rem",
        },
        medium: {
            fontSize: "1.5rem",
        },
        large: {
            fontSize: "2rem",
        },
    },
};

export const dark: Theme = {
    ...light, // heading이 동일하기 때문에 name과 color만 오버라이딩 해준다! 
    name: "dark",
    color: {
        primary: "coral",
        background: "midnightblue",
        secondary: "darkblue",
        third: "darkgreen",
    },
};

export const getTheme = (themeName: ThemeName) => {
    return themeName === "light" ? light : dark;
};
