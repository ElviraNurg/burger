import { FormEvent } from 'react';
import styles from './input.module.css';
import LookPass from '../../assets/icons/lookPass.svg?react'
type InputProps = {
    text?: string;
    inputType: string;
    inputName: string;
    placeholder: string;
    value: string;
    onChange: (e: FormEvent<HTMLInputElement>) => void;
    settigs?: { [name: string]: string | number }
}
// const settigs = {
//     minLength: 2,
//     maxLength: 8
// }

const Input = ({ inputType, inputName, placeholder, text, value, onChange, settigs }: InputProps) => {
    return (
        <>
            <input
                /*             {...settigs}
                            minLength={2} maxLength={8} */
                className={styles.input}
                type={inputType}
                name={inputName}
                placeholder={placeholder}
                value={value}
                onChange={onChange} />

            <label className={styles.label} htmlFor={inputName}>{text} {inputType === 'password' && <LookPass className={styles.label__icon} />}</label>
        </>

    )
}

export default Input;