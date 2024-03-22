import React, {useState} from "react";
import './item-add-form.css';

type ItemAddFormProps = {
  onItemAdded: (label: string) => void
};

const ItemAddForm = ({onItemAdded}: ItemAddFormProps) => {

  const [label, setLabel] = useState<any>('');

  const onLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onItemAdded(label);
    setLabel('');
  };

  return (<form className="item-add-form d-flex"
                onSubmit={onSubmit}>
    <input type="text"
           className="form-control"
           onChange={onLabelChange}
           placeholder="What needs to be done"
           value={label}/>
    <button
      className="btn btn-outline-secondary">
      Add Item
    </button>
  </form>);
};

export default ItemAddForm;