import { useEffect, useState } from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";

function App() {
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem("shoppingList")) || []
    );
    const [newItem, setNewItem] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        localStorage.setItem("shoppingList", JSON.stringify(items));
    }, [items]);

    const toggleCheckbox = (id) => {
        const listItems = items.map((item) => {
            return item.id === id ? { ...item, checked: !item.checked } : item;
        });

        setItems(listItems);
    };

    const deleteItem = (id) => {
        const listItems = items.filter((item) => item.id !== id);

        setItems(listItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem.trim()) return;
        const preparedItem = {
            item: newItem,
            checked: false,
            id: items.length ? items[items.length - 1].id + 1 : 0,
        };
        const newItemList = [...items, preparedItem];
        setNewItem("");

        setItems(newItemList);
    };

    return (
        <div className="App">
            <Header title="Groceries" />
            <AddItem
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
            />
            <SearchItem search={search} setSearch={setSearch} />
            <Content
                items={items.filter((item) => {
                    return item.item
                        .toLowerCase()
                        .includes(search.toLowerCase());
                })}
                deleteItem={deleteItem}
                toggleCheckbox={toggleCheckbox}
            />
            <Footer length={items.length} />
        </div>
    );
}

export default App;
