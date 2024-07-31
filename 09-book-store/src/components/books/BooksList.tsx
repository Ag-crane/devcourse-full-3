import styled from "styled-components";
import BookItem from "./BookItem";

export interface Book {
    id: number;
    title: string;
    img: number;
    category_id: number;
    form: string;
    isbn: string;
    summary: string;
    detail: string;
    author: string;
    pages: number;
    contents: string;
    price: number;
    pub_date: string;
    likes: number;
}

// 더미 데이터
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

function BooksList() {
    return (
    <BooksListStyle>
        <BookItem book={dummyBook}/>
    </BooksListStyle>
    );
}

const BooksListStyle = styled.div``;

export default BooksList;