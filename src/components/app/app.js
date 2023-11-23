import React, {useState} from 'react';

import AppHeader from "../app-header";
import TodoList from "../todo-list";
import SearchPanel from "../search-panel";
import ItemAddForm from "../item-add-form";
import ItemStatusFilter from "../item-status-filter";
import './app.css';

const App = () => {

  const createTodoItem = (label, id) => {
    return {
      label,
      important: false,
      done: false,
      id
    };
  };

  const [todoData, setTodoData] = useState([
    createTodoItem('Buy products', Date.now() + 1),
    createTodoItem('English lesson', Date.now() + 2),
    createTodoItem('Call Mom', Date.now() + 3)
  ]);

  const [term, setTerm] = useState('');

  const [filter, setFilter] = useState('all');

  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    setTodoData(
      [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ]);
  };

  const addItem = (text) => {
    const newElem = createTodoItem(text, Date.now());
    setTodoData([
      ...todoData, newElem
    ]);
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  };

  const onToggleImportant = (id) => {
    setTodoData(toggleProperty(todoData, id, 'important'));
  };

  const onToggleDone = (id) => {
    setTodoData(toggleProperty(todoData, id, 'done'));
  };

  const onSearchChange = (term) => {
    setTerm(term);
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const search = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1;
    });
  };

  const filterItems = (items, filter) => {
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

  const visibleItems = filterItems(
    search(todoData, term), filter);

  const doneCount = todoData
    .filter((el) => el.done).length;

  const todoCount = todoData.length - doneCount;

  return (
    <div className="todo">
      <AppHeader toDo={todoCount} done={doneCount}/>

      <div className="d-flex search-panel">
        <SearchPanel
          onSearchChange={onSearchChange}/>
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
      <ItemAddForm onItemAdded={addItem}/>
    </div>
  );
};

export default App;