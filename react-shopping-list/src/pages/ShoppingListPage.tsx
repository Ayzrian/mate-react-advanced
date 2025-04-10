import { Link, useParams } from "react-router";
import { ShoppingList } from "../components/ShoppingList/ShoppingList";
import { ShoppingListForm, ShoppingListFormValues } from "../components/ShoppingListForm/ShoppingListForm";
import { ShoppingListPanel } from "../components/ShoppingListPanel/ShoppingListPanel";
import { useShoppingList } from "../hooks/useShoppingList";
import { ShoppingItem } from "../types";

const items: ShoppingItem[] = [
  {id: 1, name: "Tomato", quantity: 3},
  {id: 2, name: "Cucumber", quantity: 1, mustHave: true},
  {id: 3, name: "Sprite", quantity: 5, mustHave: true},
  {id: 4, name: "Mellon", quantity: 1}
]

export function ShoppingListPage() {
      const {
        list,
        addItem,
        deleteItem,
        mustHaveFilter,
        setMustHaveFilter,
        setSortBy
      } = useShoppingList(items);
    
      const handleSubmit = (item: ShoppingListFormValues) => {
        addItem(item);
      }
    
      const handleItemDelete = (itemId: number) => {
        deleteItem(itemId);
      }

      const { id } = useParams();
    
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

            <br/>
            <ShoppingListPanel
                mustHaveFilter={mustHaveFilter}
                onMustHaveFilterChange={setMustHaveFilter}
                onSortByChange={setSortBy}
            />

            <div className="divider"/>

            <ShoppingList list={list} onItemDelete={handleItemDelete}/>
        </>
    );
}