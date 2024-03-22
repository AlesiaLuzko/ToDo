import React from "react";

type ItemStatusFilterProps = {
  filter: string,
  onFilterChange: (filter: string) => void
}

type Button = {
  name: string,
  label: string
}

const ItemStatusFilter: React.FC<ItemStatusFilterProps> = ({filter, onFilterChange}) => {

  const buttons: Button[] = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'}
  ];

  const buttonsArray:React.JSX.Element[] = buttons.map(({name, label}: Button) => {
    const isActive = filter === name;
    const clazz = isActive ? 'btn-primary' : 'btn-outline-primary';

    return (
      <button type="button"
              className={`btn ${clazz}`}
              key={name}
              onClick={() => onFilterChange(name)}>
        {label}
      </button>
    );
  });

  return (
    <div className="btn-group">
      {buttonsArray}
    </div>
  );
};

export default ItemStatusFilter;