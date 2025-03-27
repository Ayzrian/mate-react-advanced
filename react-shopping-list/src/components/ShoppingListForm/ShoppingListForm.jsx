import { useState } from "react"


export function ShoppingListForm({ onSubmit }) {
    const [name, setName] = useState("")

    const handleChange = (event) => {
        setName(event.target.value)
    }

    const handleCreateClick = () => {
        onSubmit({ name })
        setName("")
    }

    const handleX3Click = () => {
        onSubmit({ name })
        onSubmit({ name })
        onSubmit({ name })
        setName("")
    }

    return (<div className="flex items-center justify-center gap-2">
        <input className="input" value={name} onChange={handleChange} type="text" placeholder="Input an item name"/>
        <button className="btn btn-primary" onClick={handleCreateClick}>
            Create
        </button>
        <button className="btn btn-primary" onClick={handleX3Click}>
            X3
        </button>
    </div>)
}