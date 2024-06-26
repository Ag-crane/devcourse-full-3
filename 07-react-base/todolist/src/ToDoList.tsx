import React, { useState } from 'react';


type Todo = {
    id: number;
    text: string;
    isChecked: boolean;
};

const ToDoList: React.FC = () => {
    const title: string = '오늘 할 일'
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, text: '아침 산책', isChecked: false },
        { id: 2, text: '알고리즘 1문제 풀기', isChecked: false },
        { id: 3, text: '운동', isChecked: false },
    ])

    const handleCheck = (id: number) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo))
    }
    return (
        <div>
            <h1 className='title'>{title}</h1>
            <div className='board'>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <input type='checkbox' onChange={() => {
                                handleCheck(todo.id);
                            }} />
                            <span>
                                {
                                    todo.isChecked ? <s>{todo.text}</s> : todo.text
                                }
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ToDoList;