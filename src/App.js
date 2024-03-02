import { useEffect, useState } from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";

function App() {
    const API_URL = "http://localhost:3500/items";

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [search, setSearch] = useState("");
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw Error("Data fetch error");
                }
                const listItems = await response.json();
                setItems(listItems);
                setFetchError(null);
            } catch (e) {
                setFetchError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        (async () => await fetchItems())();
    }, []);

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
            <main>
                {isLoading && <p>Loading Items...</p>}
                {fetchError && (
                    <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>
                )}
                {!fetchError && !isLoading && (
                    <Content
                        items={items.filter((item) => {
                            return item.item
                                .toLowerCase()
                                .includes(search.toLowerCase());
                        })}
                        deleteItem={deleteItem}
                        toggleCheckbox={toggleCheckbox}
                    />
                )}
            </main>
            <Footer length={items.length} />
        </div>
    );
}

export default App;
