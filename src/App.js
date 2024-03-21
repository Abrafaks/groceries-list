import { useEffect, useState } from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

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

    const toggleCheckbox = async (id) => {
        const listItems = items.map((item) => {
            return item.id === id ? { ...item, checked: !item.checked } : item;
        });
        setItems(listItems);

        const filteredItem = items.filter((item) => {
            return item.id === id;
        });

        const updateOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ checked: !filteredItem[0].checked }),
        };

        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, updateOptions);

        if (result) {
            setFetchError(result);
        }
    };

    const deleteItem = async (id) => {
        const listItems = items.filter((item) => item.id !== id);

        const deleteOptions = {
            method: "DELETE",
        };

        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);

        if (result) {
            setFetchError(result);
        }

        setItems(listItems);
    };

    const handleSubmit = async (e) => {
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

        const postOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(preparedItem),
        };

        const result = await apiRequest(API_URL, postOptions);

        if (result) {
            setFetchError(result);
        }
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
