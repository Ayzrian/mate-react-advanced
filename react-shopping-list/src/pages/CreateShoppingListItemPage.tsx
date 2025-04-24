import { useNavigate } from "react-router";
import { ShoppingListItemForm } from "../components/ShoppingListItemForm/ShoppingListItemForm";
 
export function CreateShoppingListItemPage() {
    const navigate = useNavigate();

    const handleSubmit = () => {
        // TODO: Integrate server to create item on server

        navigate(-1);
    }

    return <div>        
        <ShoppingListItemForm onSubmit={handleSubmit} defaultValues={{
            name: "",
            quantity: 1,
            mustHave: false,
        }}/>
    </div>
}