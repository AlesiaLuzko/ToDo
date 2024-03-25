import React, { useState } from 'react';

import AppHeader from '../app-header/app-header';
import TodoList from '../todo-list/todo-list';
import SearchPanel from '../search-panel/search-panel';
import ItemAddForm from '../item-add-form/item-add-form';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import './app.css';

type Item = {
  label: string,
  important: boolean,
  done: boolean,
  id: number,
};

const App: React.FC = () => {
  const createTodoItem = (label: string, id: number): Item => {
    return {
      label,
      important: false,
      done: false,
      id,
    };
  };

  const [todoData, setTodoData] = useState<Item[]>([
    createTodoItem('Buy products', Date.now() + 1),
    createTodoItem('English lesson', Date.now() + 2),
    createTodoItem('Call Mom', Date.now() + 3),
  ]);

  const [term, setTerm] = useState('');

  const [filter, setFilter] = useState('all');

  const deleteItem = (id: number): void => {
    const idx = todoData.findIndex((el) => el.id === id);
    setTodoData(
      [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
      ]);
  };

  const addItem = (text: string): void => {
    const newElem = createTodoItem(text, Date.now());
    setTodoData([...todoData, newElem]);
  };

  const toggleProperty = (arr: Item[], id: number, propName: string): Item[] => {
    const idx = arr.findIndex((el: any) => el.id === id);
    const oldItem: any = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1),
    ];
  };

  const onToggleImportant = (id: number): void => {
    setTodoData(toggleProperty(todoData, id, 'important'));
  };

  const onToggleDone = (id: number): void => {
    setTodoData(toggleProperty(todoData, id, 'done'));
  };

  const onSearchChange = (term: string): void => {
    setTerm(term);
  };

  const onFilterChange = (filter: string): void => {
    setFilter(filter);
  };

  const search = (items: Item[], term: string): Item[] => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item: Item): boolean => {
      return item.label
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1;
    });
  };

  const filterItems = (items: Item[], filter: string): Item[] => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  const visibleItems: Item[] = filterItems(search(todoData, term), filter);

  const doneCount: number = todoData.filter((el) => el.done).length;

  const todoCount: number = todoData.length - doneCount;

  return (
    <div className="todo">
      <AppHeader toDo={todoCount} done={doneCount} />

      <div className="d-flex search-panel">
        <SearchPanel
          onSearchChange={onSearchChange} />
        <ItemStatusFilter
          filter={filter}
          onFilterChange={onFilterChange}
        />
      </div>

      <TodoList
        todos={visibleItems}
        onDeleted={deleteItem}
        onToggleImportant={onToggleImportant}
        onToggleDone={onToggleDone}
      />
      <ItemAddForm onItemAdded={addItem} />
    </div>
  );
};

export default App;
export type { Item };
