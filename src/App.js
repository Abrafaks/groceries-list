import { useState } from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

function App() {
    const [items, setItems] = useState([
        {
            id: 1,
            checked: false,
            item: "Item 1",
        },
        {
            id: 2,
            checked: false,
            item: "Item 2",
        },
        {
            id: 3,
            checked: false,
            item: "Item 3",
        },
    ]);

    const toggleCheckbox = (id) => {
        const listItems = items.map((item) => {
            return item.id === id ? { ...item, checked: !item.checked } : item;
        });

        setItems(listItems);
        localStorage.setItem("shoppingList", JSON.stringify(listItems));
    };

    const deleteItem = (id) => {
        const listItems = items.filter((item) => item.id !== id);

        setItems(listItems);
    };

    return (
        <div className="App">
            <Header title="Groceries" />
            <Content
                items={items}
                deleteItem={deleteItem}
                toggleCheckbox={toggleCheckbox}
            />
            <Footer length={items.length} />
        </div>
    );
}

export default App;
