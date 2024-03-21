import React from "react";
import LineItem from "./LineItem";

function ItemList({ items, deleteItem, toggleCheckbox }) {
    return (
        <ul>
            {items.map((item) => (
                <LineItem
                    item={item}
                    deleteItem={deleteItem}
                    toggleCheckbox={toggleCheckbox}
                    key={item.id}
                />
            ))}
        </ul>
    );
}

export default ItemList;
