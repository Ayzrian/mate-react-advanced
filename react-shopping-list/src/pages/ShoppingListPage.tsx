import { useState } from "react"
import { Header } from "../components/Header/Header"
import { ShoppingList } from "../components/ShoppingList/ShoppingList"
import { ShoppingListForm, ShoppingListFormValues } from "../components/ShoppingListForm/ShoppingListForm"
import { ShoppingListPanel } from "../components/ShoppingListPanel/ShoppingListPanel"
import { useShoppingList } from "../hooks/useShoppingList"
import { ShoppingItem } from "../types"

const items: ShoppingItem[] = [
  {id: 1, name: "Tomato", quantity: 3, mustHave: false},
  {id: 2, name: "Cucumber", quantity: 1, mustHave: true},
  {id: 3, name: "Sprite", quantity: 5, mustHave: true},
  {id: 4, name: "Mellon", quantity: 1, mustHave: false}
]

export function ShoppingListPage() {
  const {
    list,
    addItem,
    deleteItem,
    updateItem,
    mustHaveFilter,
    setMustHaveFilter,
    setSortBy
  } = useShoppingList(items);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(0);
  const editingItem = list.find(item => item.id === editingId) as ShoppingItem;

  const handleSubmit = (item: ShoppingListFormValues) => {
    if (editing) {
      updateItem(editingId, item);
      setEditing(false);
    } else {
      addItem(item);
    }
  } 

  const handleItemDelete = (itemId: number) => {
    deleteItem(itemId);
  }

  const handleItemEdit = (itemId: number) => {
    setEditingId(itemId);
    setEditing(true);
  } 

  return (
    <>
        {
            !editing &&
            <ShoppingListForm onSubmit={handleSubmit} defaultValues={{
                name: "",
                quantity: 1,
                mustHave: false,
            }}/>
        }

        {
            editing &&
            <ShoppingListForm key={editingId} onSubmit={handleSubmit} defaultValues={editingItem}/>
        }

        <br/>
        <ShoppingListPanel
            mustHaveFilter={mustHaveFilter}
            onMustHaveFilterChange={setMustHaveFilter}
            onSortByChange={setSortBy}
        />

        <div className="divider"/>

        <ShoppingList list={list} onItemDelete={handleItemDelete} onItemEdit={handleItemEdit}/>
    </>
  )
}
