import { render, screen } from "@testing-library/react";
import InputText from "./InputText";
import { BookStoreThemeProvider } from "../../context/themeContext";
import React from "react";

describe("InputText 컴포넌트 테스트", () => {
    it("placeholder가 정상적으로 출력되는가", () => {
        render(
            <BookStoreThemeProvider>
                <InputText placeholder="입력해주세요" />
            </BookStoreThemeProvider>
        );
        expect(screen.getByPlaceholderText("입력해주세요")).toBeInTheDocument();
    });
    it("forwadRef 테스트", () => {
        const ref = React.createRef<HTMLInputElement>();
        render(
            <BookStoreThemeProvider>
                <InputText ref={ref} placeholder="입력해주세요" />
            </BookStoreThemeProvider>
        );
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});
