import { Link } from "react-router";

export interface ShoppingList {
    id: number;
    name: string;
}

const shoppingLists: ShoppingList[] = [
    {
        id: 1,
        name: 'Books to buy',
    },
    {
        id: 2,
        name: 'Walmart',
    },
    {
        id: 3,
        name: 'Games',
    },
]

export function ShoppingListsPage() {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
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
}