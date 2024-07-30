import styled from "styled-components";
import { Book } from "./BooksList";
import { getImgSrc } from "../../utils/image";
import { formatNumber } from "../../utils/format";
import { FaHeart } from "react-icons/fa";

interface Props {
    book: Book;
}

function BookItem({book}: Props) {
    return (
    <BookItemStyle>
        <div><img src={getImgSrc(book.id)} alt={book.title}/></div>
        <div className="content">
            <h2 className="title">{book.title}</h2>
            <p className="summary">{book.summary}</p>
            <p className="author">{book.author}</p>
            <p className="price">{formatNumber(book.price)}원</p>
        </div>
        <div className="likes">
            <FaHeart />
            <span>{book.likes}</span>
        </div>
    </BookItemStyle>
    );
}

const BookItemStyle = styled.div``;

export default BookItem;