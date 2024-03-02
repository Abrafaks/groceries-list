import ItemList from "./ItemList";

const Content = ({ items, deleteItem, toggleCheckbox }) => {
    return (
        <>
            {items.length ? (
                <ItemList
                    items={items}
                    deleteItem={deleteItem}
                    toggleCheckbox={toggleCheckbox}
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>Your list is empty</p>
            )}
        </>
    );
};

export default Content;
