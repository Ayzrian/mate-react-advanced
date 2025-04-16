import { cva } from "class-variance-authority";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
  .object({
    name: yup.string().min(1).max(100).required(),
    quantity: yup.number().min(1).integer().required(),
    mustHave: yup.boolean().required()
  })
  .required()

export type ShoppingListFormValues = yup.InferType<typeof schema>;

interface ShoppingListFormProps {
    defaultValues: ShoppingListFormValues
    onSubmit: (item: ShoppingListFormValues) => void
 }
 

const input = cva(["input"], {
    variants: {
        error: {
            true: ["input-error"]
        }
    }
});

export function ShoppingListForm({ onSubmit, defaultValues }: ShoppingListFormProps) {
    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors },
        reset
      } = useForm({
        resolver: yupResolver(schema),
        defaultValues
      })

    const handleSubmit = (values: ShoppingListFormValues) => {
        onSubmit({ ...values })

        reset()
    }

    return (<div className="flex items-center justify-center gap-2">
        <div className="card shadow-sm w-[300px]">
            <div className="card-body">
                <h2 className="card-title">
                    Add New Item
                </h2>
                <form className="flex flex-col space-y-2" onSubmit={handleFormSubmit(handleSubmit)}>
                    <input className={input({ error: !!errors.name })} {...register("name")} type="text" placeholder="Input an item name"/>
                    {
                        errors.name && <p className="text-red-500">{errors.name.message}</p>
                    }

                    <input className={input({ error: !!errors.quantity  })} {...register("quantity")} type="number"/>
                    {
                        errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>
                    }

                    <label className="label cursor-pointer space-x-1">
                        <span className="label-text">Must Have:</span>
                        <input className="checkbox" {...register("mustHave")} type="checkbox"/>
                    </label>

                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </div>)
}