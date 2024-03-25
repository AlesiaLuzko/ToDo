import React from 'react';

import TodoListItem from '../todo-list-item/todo-list-item';
import type { Item } from '../app/app';
import './todo-list.css';

type TodoListProps = {
  todos: Item[],
  onDeleted: (id: number) => void,
  onToggleImportant: (id: number) => void,
  onToggleDone: (id: number) => void,
};

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {

  const elements = todos.map((item) => {

    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      {elements}
    </ul>
  );
};

export default TodoList;