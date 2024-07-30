import { render, screen } from "@testing-library/react";
import BookItem from "./BookItem";
import { BookStoreThemeProvider } from "../../context/themeContext";
import { Book } from "./BooksList";

const dummyBook: Book = {
    id: 1,
    title: "책제목",
    img: 1,
    category_id: 1,
    form: "형태",
    isbn: "isbn",
    summary: "요약",
    detail: "상세",
    author: "저자",
    pages: 1,
    contents: "내용",
    price: 10000,
    pub_date: "2021-01-01",
    likes: 1,
};

describe("BookItem", () => {
    it("renders book item", () => {
        render(
            <BookStoreThemeProvider>
                <BookItem book={dummyBook} />
            </BookStoreThemeProvider>
        );
        expect(screen.getByText(dummyBook.title)).toBeInTheDocument();
        expect(screen.getByText(dummyBook.summary)).toBeInTheDocument();
        expect(screen.getByText(dummyBook.author)).toBeInTheDocument();
        expect(screen.getByText("10,000원")).toBeInTheDocument();
        expect(screen.getByText(dummyBook.likes)).toBeInTheDocument();
        expect(screen.getByAltText(dummyBook.title)).toHaveAttribute("src",`https://picsum.photos/id/${dummyBook.img}/600/600`);
    });
});
