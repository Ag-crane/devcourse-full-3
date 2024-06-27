import React from 'react';
import './App.css';
import ToDoList from './ToDoList';
import Clock from './Clock';

function App() {
  return (
    <div className="container">
      <ToDoList />
      <Clock />
    </div>
  );
}

export default App;
