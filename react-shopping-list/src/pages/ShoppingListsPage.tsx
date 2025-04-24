import { Link } from "react-router";
import { useShoppingListsService } from "../services/ShoppingListsService";
import { useEffect, useState } from "react";

export interface ShoppingList {
    id: number;
    name: string;
}

export function ShoppingListsPage() {
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);

    const { getShoppingLists } = useShoppingListsService();
    
    useEffect(() => {
        getShoppingLists().then(results => setShoppingLists(results));
    }, []);

    return <div>
        <div className="flex justify-end">
            <Link to={`./create`} className="btn btn-small btn-primary">Create</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {
                shoppingLists.length === 0 && <p>No shopping lists yet...</p>
            }

            {
                shoppingLists.map((list) => <div key={list.id} className="card bg-white shadow-sm cursor-pointer">
                    <div className="card-body text-center font-bold">
                        <Link to={`/shopping-lists/${list.id}`}>
                            {list.name}
                        </Link>
                    </div>
                </div>)
            }
        </div>
    </div>
}