import { Header } from "./components/Header/Header"
import { ShoppingList } from "./components/ShoppingList/ShoppingList"
import { ShoppingListForm, ShoppingListFormValues } from "./components/ShoppingListForm/ShoppingListForm"
import { ShoppingListPanel } from "./components/ShoppingListPanel/ShoppingListPanel"
import { useShoppingList } from "./hooks/useShoppingList"
import { ShoppingItem } from "./types"

const items: ShoppingItem[] = [
  {id: 1, name: "Tomato", quantity: 3},
  {id: 2, name: "Cucumber", quantity: 1, mustHave: true},
  {id: 3, name: "Sprite", quantity: 5, mustHave: true},
  {id: 4, name: "Mellon", quantity: 1}
]

function App() {
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

  return (
    <>
      <Header>
        <em>Shoppping List App</em>
      </Header>

      <div className="container mx-auto p-2">
        <ShoppingListForm onSubmit={handleSubmit} />

        <br/>
        <ShoppingListPanel
          mustHaveFilter={mustHaveFilter}
          onMustHaveFilterChange={setMustHaveFilter}
          onSortByChange={setSortBy}
        />

        <div className="divider"/>

        <ShoppingList list={list} onItemDelete={handleItemDelete}/>
      </div>
    </>
  )
}

export default App
