import React, { FC, useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SideForm";
import { FiPlusCircle } from "react-icons/fi";
import {
    addButton,
    addSection,
    boardItem,
    boardItemActive,
    container,
    title,
} from "./BoardList.css";
import clsx from "clsx";

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
        <div className={container}>
            <div className={title}>게시판:</div>
            {boardArray.map((board, index) => (
                <div
                    key={board.boardId}
                    onClick={() => setActiveBoardId(boardArray[index].boardId)}
                    className={clsx(
                        {
                            [boardItemActive]: boardArray.findIndex(
                                (b) => b.boardId === activeBoardId
                            ),
                        },
                        {
                            [boardItem]: boardArray.findIndex(
                                (b) => b.boardId !== activeBoardId
                            ),
                        }
                    )}
                >
                    <div>{board.boardName}</div>
                </div>
            ))}
            <div className={addSection}>
                {isFormOpen ? (
                    <SideForm />
                ) : (
                    <FiPlusCircle
                        className={addButton}
                        onClick={() => setIsFormOpen(!isFormOpen)}
                    />
                )}
            </div>
        </div>
    );
};

export default BoardList;
