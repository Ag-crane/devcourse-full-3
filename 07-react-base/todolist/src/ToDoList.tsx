import React, { useState } from 'react';

const ToDoList: React.FC = () => {
    const title: string = '오늘 할 일'
    const [todos] = useState<string[]>(['운동하기', '아침먹기', '점심먹기', '저녁먹기'])
    return (
        <div>
            <h1 className='title'>{title}</h1>
            <div className='board'>
                <ul>
                    {todos.map((todo, index) => (
                        <li key={index}>{todo}</li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default ToDoList;