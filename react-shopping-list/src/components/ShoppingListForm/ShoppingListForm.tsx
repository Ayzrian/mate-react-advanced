import { cva } from "class-variance-authority";
import { ChangeEvent, FormEvent, useState } from "react"

export interface ShoppingListFormValues {
    name: string;
    quantity: number;
    mustHave: boolean;
}

interface ShoppingListFormProps {
    onSubmit: (item: ShoppingListFormValues) => void
}

const input = cva(["input"], {
    variants: {
        error: {
            true: ["input-error"]
        }
    }
});

export function ShoppingListForm({ onSubmit }: ShoppingListFormProps) {
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState("")

    const [quantity, setQuantity] = useState(1)
    const [quantityError, setQuantityError] = useState("")

    const [mustHave, setMustHave] = useState(false)

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuantity(event.target.valueAsNumber)
    }

    const handleMustHaveChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMustHave(event.target.checked)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let isValid = true;
        setNameError("");
        setQuantityError("");

        if (name.length < 1 || name.length > 100) {
            setNameError("Name length must have at least 1 character and be less than 100 characters");
            isValid = false;
        }

        if (quantity < 1) {
            setQuantityError("Quantity can not be less than 1");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        onSubmit({ name, quantity, mustHave })
        setName("")
        setQuantity(1)
        setMustHave(false)
    }

    return (<div className="flex items-center justify-center gap-2">
        <div className="card shadow-sm w-[300px]">
            <div className="card-body">
                <h2 className="card-title">
                    Add New Item
                </h2>
                <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                    <input className={input({ error: nameError.length > 0 })} value={name} onChange={handleNameChange} type="text" placeholder="Input an item name"/>
                    {
                        nameError && <p className="text-red-500">{nameError}</p>
                    }

                    <input className={input({ error: quantityError.length > 0 })} value={quantity} onChange={handleQuantityChange} type="number"/>
                    {
                        quantityError && <p className="text-red-500">{quantityError}</p>
                    }

                    <label className="label cursor-pointer space-x-1">
                        <span className="label-text">Must Have:</span>
                        <input className="checkbox" checked={mustHave} onChange={handleMustHaveChange} type="checkbox"/>
                    </label>

                    <button className="btn btn-primary" type="submit">
                        Create
                    </button>
                </form>
            </div>
        </div>
    </div>)
}