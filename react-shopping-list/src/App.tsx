import { BrowserRouter, Route, Routes } from "react-router"
import { ShoppingListPage } from "./pages/ShoppingListPage"
import { ShoppingListsPage } from "./pages/ShoppingListsPage"
import { AppLayout } from "./pages/AppLayout"

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/shopping-lists" element={<AppLayout />}>
        <Route index element={<ShoppingListsPage />}/>
        <Route path=":id" element={<ShoppingListPage />}/>
      </Route>

      <Route element={<AppLayout/>}>
        <Route path="*" element={<p>Page not found.</p>}/>
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App