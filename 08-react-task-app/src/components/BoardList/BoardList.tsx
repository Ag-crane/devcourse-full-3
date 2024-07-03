import React, { FC, useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SideForm";
import { FiPlusCircle } from "react-icons/fi";

type TboardListProps = {
    activeBoardId: string;
    setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<TboardListProps> = ({
    activeBoardId,
    setActiveBoardId,
}) => {
    const { boardArray } = useTypedSelector((state) => state.boards);
    const [isFormOpen, setIsFormOpen] = useState(false);
    return (
        <div>
            <div>게시판:</div>
            {boardArray.map((board) => (
                <div key={board.boardId}>
                    <div>{board.boardName}</div>
                </div>
            ))}
            <div>{isFormOpen ? <SideForm /> : <FiPlusCircle onClick={()=>setIsFormOpen(!isFormOpen)}/>}</div>
        </div>
    );
};

export default BoardList;
