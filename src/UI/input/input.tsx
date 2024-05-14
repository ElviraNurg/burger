import { FormEvent, useEffect, useState } from 'react';
import { Dispatch } from 'react';
import styles from './input.module.css';
import LookPass from '../../assets/icons/lookPass.svg?react';
import ChangeIcon from '../../assets/icons/change-icon.svg?react'
type InputProps = {
    text?: string;
    inputType: string;
    inputName: string;
    placeholder?: string;
    value: string;
    parent?: string;
    disabled?: boolean;
    setDisabled?: Dispatch<React.SetStateAction<boolean>>;
    onChange: (e: FormEvent<HTMLInputElement>) => void;
    settigs?: { [name: string]: string | number }
}
// const settigs = {
//     minLength: 2,
//     maxLength: 8
// }

const Input = ({ inputType, inputName, placeholder, text, value, disabled, setDisabled, parent, onChange }: InputProps) => {
const [passInputType, setPassInputType]=useState(inputType)
    const onClick = () => {
        setDisabled && setDisabled(prev => !prev)
    }
    const changeInputType=()=>{
        passInputType==='password'?
setPassInputType('text'):setPassInputType('password')
    }
    useEffect(() => { }, [disabled])
    return (
        <>
            <input
                /*             {...settigs}
                            minLength={2} maxLength={8} */
                className={parent==='profile'?`${styles.input} ${styles.input__profile}`:styles.input}
                type={inputName==='password'?passInputType:inputType}
                name={inputName}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={parent === 'profile' && disabled ? true : false}
            />

            <label className={parent==='profile'?`${styles.label} ${styles.label__profile}`:styles.label} htmlFor={inputName}>
                {text}
                {inputName === 'password'&&parent !== 'profile' 
                 && <LookPass
                 onClick={changeInputType}
                 className={styles.label__icon} />}
                {parent === 'profile' && disabled &&
                    <ChangeIcon
                        onClick={onClick}
                        className={styles.label__change_icon} />}
            </label>
        </>

    )
}

export default Input;