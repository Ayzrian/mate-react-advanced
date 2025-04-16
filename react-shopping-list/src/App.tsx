import { BrowserRouter, Route, Routes } from "react-router"
import { ShoppingListPage } from "./pages/ShoppingListPage"
import { ShoppingListsPage } from "./pages/ShoppingListsPage"
import { AppLayout } from "./pages/AppLayout"
import { HomePage } from "./pages/HomePage"
import { CreateShoppingListItemPage } from "./pages/CreateShoppingListItemPage"

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/shopping-lists" element={<AppLayout />}>
        <Route index element={<ShoppingListsPage />}/>
        <Route path=":id">
           <Route index element={<ShoppingListPage />}/>
           <Route path="create" element={<CreateShoppingListItemPage />}/>
         </Route>
      </Route>

      <Route element={<AppLayout/>}>
        <Route path="/" element={<HomePage />}/>

        <Route path="*" element={<p>Page not found.</p>}/>
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App