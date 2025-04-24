import { useState } from "react"
import { ShoppingList } from "../components/ShoppingList/ShoppingList"
import { ShoppingListItemForm, ShoppingListItemFormValues } from "../components/ShoppingListItemForm/ShoppingListItemForm"
import { ShoppingListPanel } from "../components/ShoppingListPanel/ShoppingListPanel"
import { useShoppingList } from "../hooks/useShoppingList"
import { ShoppingItem } from "../types"
import { useParams, Link } from "react-router"


export function ShoppingListPage() {
  const { id } = useParams();

  const {
    list,
    deleteItem,
    updateItem,
    mustHaveFilter,
    setMustHaveFilter,
    setSortBy
  } = useShoppingList(Number(id));
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(0);
  const editingItem = list.find(item => item.id === editingId) as ShoppingItem;

  const handleSubmit = async (item: ShoppingListItemFormValues) => {
    if (editing) {
      await updateItem(editingId, item);
      setEditing(false);
    }
  } 

  const handleItemDelete = async (itemId: number) => {
    await deleteItem(itemId);
  }

  const handleItemEdit = (itemId: number) => {
    setEditingId(itemId);
    setEditing(true);
  }

  return (
    <>
        <div className="flex">
            <div className="breadcrumbs text-sm flex-1">
                <ul>
                    <li><Link to="../">Shopping Lists</Link></li>
                    <li><Link to={`../${id}`}>Shopping List #{id}</Link></li>
                </ul>
            </div>

            <Link to={`../${id}/create`} className="btn btn-small btn-primary">Add</Link>
        </div>


        {
            editing &&
            <ShoppingListItemForm key={editingId} onSubmit={handleSubmit} defaultValues={editingItem}/>
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
