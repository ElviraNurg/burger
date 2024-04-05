import { useState, FormEvent } from "react"
const useForm = () => {
    interface ISetValues {
        [name: string]: any
    }
    const [values, setValues] = useState<ISetValues>()

    const onChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setValues({ ...values, [name]: value })
    }
return {values, onChange}
}
export default useForm