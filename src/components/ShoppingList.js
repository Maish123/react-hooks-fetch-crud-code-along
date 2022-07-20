import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  function handleAddItem(newItem){
    setItems([...items, newItem]);
  }

  function handleUpdateItem(updatedItem) {
   const updatedItems = items.map((item)=>{
    if (item.id === updatedItem.id){
      return updatedItem
    } else{
      return item
    }
   });
   console.log(updatedItems)
   setItems(updatedItems)
  }

  function handleDeleteItem(deletedItem){
   const updatedItems = items.filter((item)=>item.id !==deletedItem.id)
   console.log(updatedItems)
   setItems(updatedItems)
  }

  useEffect(()=>{
    fetch("http://localhost:4000/items")
    .then((resp)=>resp.json())
    .then((respObj)=>setItems(respObj))//here our respoObj is the response we get for frtching the data, which is an object
  },[]);

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdatedItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
