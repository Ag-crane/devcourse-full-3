export type ThemeName = "light" | "dark";
export type ColorKey = "primary" | "background" | "secondary" | "third" | "border" | "text";

interface Theme {
    name: ThemeName;
    color: Record<ColorKey, string>;
    heading: {
        [key in HeadingSize]: {
            fontSize: string;
        };
    };
    button: {
        [key in ButtonSize]: {
            fontSize: string;
            padding: string; // 폰트 사이즈에 따라 달라지기 때문
        };
    };
    buttonScheme: {
        [key in ButtonScheme]: {
            color: string;
            backgroundColor: string;
        };
    };
    borderRadius: {
        default: string;
    }
}

export type HeadingSize = "small" | "medium" | "large";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonScheme = "primary" | "normal";

export const light: Theme = {
    name: "light",
    color: {
        primary: "brown",
        background: "lightgray",
        secondary: "blue",
        third: "green",
        border: "gray",
        text: "black",
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
    button: {
        small: {
            fontSize: "0.75rem",
            padding: "0.25rem 5rem",
        },
        medium: {
            fontSize: "1rem",
            padding: "0.5rem 1rem",
        },
        large: {
            fontSize: "1.5rem",
            padding: "1rem 2rem",
        },
    },
    buttonScheme: {
        primary: {
            color: "white",
            backgroundColor: "midnightblue",
        },
        normal: {
            color: "black",
            backgroundColor: "lightgray",
        },
    },
    borderRadius: {
        default: "4px",
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
        border: "gray",
        text: "white",
    },
};

export const getTheme = (themeName: ThemeName) => {
    return themeName === "light" ? light : dark;
};
