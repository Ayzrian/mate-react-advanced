import { cva } from "class-variance-authority";
import { ShoppingItem } from "../../types";

interface ShoppingListItemProps {
    item: ShoppingItem;
    onItemDelete: (itemId: number) => void
}

export function ShoppingListItem({ item: { id, name, quantity = 1, mustHave }, onItemDelete}: ShoppingListItemProps) {
    const itemClass = cva("flex justify-between items-center bg-base-100 p-3 rounded shadow-md", {
        variants: {
            mustHave: {
                true: "border border-dashed border-red-300"
            }
        }
    })

    const handleDeleteClick = () => {
        onItemDelete(id)
    }

    return (
        <li className={itemClass({ mustHave })}>
             <div className="space-x-2">
                <span className="badge badge-soft badge-primary">{quantity}</span>
                <span>{name}</span>
             </div>
            <button className="btn btn-xs btn-circle btn-error text-base" onClick={handleDeleteClick}>X</button>
        </li>
    );
}