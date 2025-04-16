import { useNavigate } from "react-router";
import { ShoppingListForm } from "../components/ShoppingListForm/ShoppingListForm";
 
export function CreateShoppingListItemPage() {
    const navigate = useNavigate();

    const handleSubmit = () => {
        // TODO: Integrate server to create item on server

        navigate(-1);
    }

    return <div>        
        <ShoppingListForm onSubmit={handleSubmit} defaultValues={{
            name: "",
            quantity: 1,
            mustHave: false,
        }}/>
    </div>
}