import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Clock from './Clock';

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
    const [inputText, setInputText] = useState<string>('')

    const handleCheck = (id: number) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }

    const addTodo = () => {
        if (inputText === '') return;
        setTodos([...todos, { id: Date.now(), text: inputText, isChecked: false }]);
        setInputText('');
    }
    const deleteTodo = (id: number) => {
        return () => {
            setTodos(todos.filter((todo) => todo.id !== id));
        }
    }

    return (
        <div>
            <h1 className='title'>{title}</h1>
            <div>
                <input type='text' placeholder='할 일 입력' onChange={handleInputChange} />
                <Button variant="primary" onClick={addTodo}>추가</Button>
            </div>
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
                            <button className='button-delete' onClick={deleteTodo(todo.id)}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
            <Clock></Clock>
        </div>
    );
};

export default ToDoList;