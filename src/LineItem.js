import React from "react";
import { FaTrashAlt } from "react-icons/fa";

function LineItem({ item, deleteItem, toggleCheckbox }) {
    return (
        <li className="item" key={item.id}>
            <input
                onChange={() => toggleCheckbox(item.id)}
                type="checkbox"
                checked={item.checked}
            />
            <label
                onDoubleClick={() => toggleCheckbox(item.id)}
                style={item.checked ? { textDecoration: "line-through" } : null}
            >
                {item.item}
            </label>
            <FaTrashAlt
                role="button"
                tabIndex="0"
                onClick={() => deleteItem(item.id)}
                aria-label={`Delete ${item.item}`}
            />
        </li>
    );
}

export default LineItem;
