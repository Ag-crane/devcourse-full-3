import { createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../types";

type TBoardsState = {
    modalActive: boolean;
    boardArray: IBoard[];
};

const initialState: TBoardsState = {
    modalActive: false,
    boardArray: [
        {
            boardId: "board-0",
            boardName: "첫 번째 게시물",
            lists: [
                {
                    listId: "list-0",
                    listName: "List 1",
                    tasks: [
                        {
                            taskId: "task-0",
                            taskName: "Task 1",
                            taskDescription: "Task 1 Description",
                            taskOwner: "John"
                        },
                        {
                            taskId: "task-1",
                            taskName: "Task 2",
                            taskDescription: "Task 2 Description",
                            taskOwner: "John"
                        }
                    ]
                },
                {
                    listId: "list-1",
                    listName: "List 2",
                    tasks: [
                        {
                            taskId: "task-2",
                            taskName: "Task 3",
                            taskDescription: "Task 3 Description",
                            taskOwner: "John"
                        },
                        {
                            taskId: "task-3",
                            taskName: "Task 4",
                            taskDescription: "Task 4 Description",
                            taskOwner: "John"
                        }
                    ]
                }
                
            ]
        },
        {
            boardId: "board-1",
            boardName: "두 번째 게시물",
            lists: [
                {
                    listId: "list-0",
                    listName: "List 1",
                    tasks: [
                        {
                            taskId: "task-0",
                            taskName: "Task 1",
                            taskDescription: "Task 1 Description",
                            taskOwner: "John"
                        },
                        {
                            taskId: "task-1",
                            taskName: "Task 2",
                            taskDescription: "Task 2 Description",
                            taskOwner: "John"
                        }
                    ]
                },
                {
                    listId: "list-1",
                    listName: "List 2",
                    tasks: [
                        {
                            taskId: "task-2",
                            taskName: "Task 3",
                            taskDescription: "Task 3 Description",
                            taskOwner: "John"
                        },
                        {
                            taskId: "task-3",
                            taskName: "Task 4",
                            taskDescription: "Task 4 Description",
                            taskOwner: "John"
                        }
                    ]
                }
                
            ]
        }
    ]
};

const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers:{

    }
});

export const boardsReducer = boardsSlice.reducer;