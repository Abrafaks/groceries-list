import React from "react";
import { FaPlus } from "react-icons/fa";
import "./AddItem.css";
function AddItem() {
    return (
        <form className="addForm">
            <label htmlFor="addItem">Add Item</label>
            <input
                autoFocus
                type="text"
                placeholder="Add Item..."
                id="addItem"
                required
            />
            <button type="submit" aria-label="Add Item">
                <FaPlus />
            </button>
        </form>
    );
}

export default AddItem;
