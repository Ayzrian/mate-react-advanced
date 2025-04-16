import { useState, useMemo } from "react"
import { ShoppingItem } from "../types";
import { ShoppingListFormValues } from "../components/ShoppingListForm/ShoppingListForm";
import { useSearchParams } from "react-router";

export function useShoppingList(initialList: ShoppingItem[]) {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateSearchParams = (name: string, value: boolean | string) => {
        const newSearchParams = new URLSearchParams(searchParams);
 
 
        if (value) {
            newSearchParams.set(name, String(value));
        } else {
            newSearchParams.delete(name);
        }
 
 
        setSearchParams(newSearchParams);
    } 

    const [list, setList] = useState(initialList);

    const [mustHaveFilter, setMustHaveFilter] = useState(searchParams.get('mustHave') ? Boolean(searchParams.get('mustHave')): false);
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') ? searchParams.get('sortBy'): '');

    const addItem = (item: ShoppingListFormValues) => {
        setList((list) => [...list, { ...item, id: Math.floor(Math.random() * 100000) + 1 }]);
    }

    const deleteItem = (itemId: number) => {
        const index = list.findIndex((item) => item.id === itemId);

        setList([...list.slice(0, index), ...list.slice(index + 1)]);
    }

    const updateItem = (itemId: number, update: ShoppingListFormValues) => {
        setList((list) => list.map(item => {
            if (item.id === itemId) {
                return {...item, ...update};
            }

            return item;
        }))
    } 

    const resultingList = useMemo(() => {
        const results = mustHaveFilter ? list.filter((item) => item.mustHave) : list;

        if (!sortBy) {
            return results;
        }

        switch(sortBy) {
            case 'mustHave':
                return [...results].sort((a, b) => {
                if (a.mustHave && b.mustHave) {
                    return 0
                }

                if (a.mustHave && !b.mustHave) {
                    return -1;
                }

                return 1;
                });
            case 'quantity':
                return [...results].sort((a, b) => b.quantity - a.quantity);
            default:
                throw new Error('Unknown field name!');
        }
    }, [list, mustHaveFilter, sortBy]) 

    return {
        list: resultingList,
        addItem,
        deleteItem,
        updateItem,
        mustHaveFilter,
        setMustHaveFilter: (value: boolean) => {
            setMustHaveFilter(value);
            updateSearchParams('mustHave', value);
        },
        setSortBy: (value: string) => {
            setSortBy(value);
            updateSearchParams('sortBy', value);
        }
    }
}