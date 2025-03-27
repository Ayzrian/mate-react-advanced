export function ShoppingListPanel({ mustHaveFilter, onMustHaveFilterChange, onSortByChange  }) {
    const handleCheckBoxChange = (event) => {
        onMustHaveFilterChange(event.target.checked);
    }

    return (<div className="flex items-center justify-between">
        <label className="label cursor-pointer space-x-1">
             <span className="label-text">Only Must Have:</span>
             <input
                 type="checkbox"
                 className="toggle toggle-primary"
                 value={mustHaveFilter} onChange={handleCheckBoxChange}
             />
         </label>

         <div className="btn-group space-x-2">
             <span className="label">Sort by:</span>
             <button className="btn btn-soft btn-sm btn-neutral" onClick={() => onSortByChange('mustHave')}>Must Have</button>
             <button className="btn btn-soft btn-sm btn-neutral" onClick={() => onSortByChange('quantity')}>Quantity</button>
             <button className="btn btn-soft btn-sm btn-error" onClick={() => onSortByChange('')}>Reset</button>
         </div>
    </div>)
}
