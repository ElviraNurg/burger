import styles from './userprofile.module.css';
import Input from '../input/input';
import Title from '../title/Title';
import Button from '../button/button';
import useForm from '../../hooks/UseForm';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useTypedSelector';
import { FormEvent, useEffect, useState } from 'react';
import { useResize } from '../../hooks/useResize';
import { changeUserDatas } from '../../store/auth/authSlice';

const UserProfile = () => {
    const value = useTypedSelector(store => store.auth.user);
    const dispatch = useTypedDispatch();
    const size = useResize();
    const [disabled, setDisabled] = useState(true);
    const { values, setValues, onChange } = useForm();
    const [isValid, setIsvalid]=useState(false)
    const onClick = () => {
        setDisabled(true);
        setValues(value)
    }
    useEffect(() => {
        if (values) {
            setValues(values)
        }
    }, [values])

    const checkValues = (obj1: {
        [name: string]: any
    }, obj2: {
        [name: string]: any
    }) => {
        let isValid = false
        for (let i in obj1) {
            if (obj1[i] !== obj2[i]) {
                return isValid = true
            }
        }
        return isValid
    }

useEffect(()=>{
    values&&setIsvalid(checkValues(values,value))
    values&&setDisabled(!checkValues(values,value))
},[values])
//console.log('isValid', isValid);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const token = localStorage.getItem('token');        
        values && token && dispatch(changeUserDatas({ values, token }))
        setDisabled(true)
    }

    return (
        <>
            {size.isScreenS && <Title text={'Профиль'} />}
            <form onSubmit={onSubmit} className={styles.form}>
                <div className={styles.input__box}>
                    <Input
                        inputType='text'
                        inputName={'name'}
                        placeholder={value.name}
                        value={values?.name ? values.name : value.name}
                        parent='profile'
                        text='Имя'
                        disabled={disabled}
                        onChange={onChange}
                        setDisabled={setDisabled}
                    />
                </div>
                <div className={styles.input__box}>
                    <Input
                        inputType='email'
                        inputName={'email'}
                        placeholder={value.email}
                        value={values?.email ? values.email : value.email}
                        parent='profile'
                        text='Логин'
                        disabled={disabled}
                        onChange={onChange}
                        setDisabled={setDisabled}
                    />
                </div>
                <div className={styles.input__box}>
                    <Input
                        inputType='password'
                        inputName={'password'}
                        placeholder={value.password}
                        value={values?.password ? values.password : value.password}
                        parent='profile'
                        text='Пароль'
                        disabled={disabled}
                        onChange={onChange}
                        setDisabled={setDisabled}
                    />
                </div>
                {isValid&&!disabled &&
                    <div className={styles.buttons__box}>
                        <button className={styles.button} onClick={onClick} type='reset'>Отмена</button>
                        <Button text={'Сохранить'} type='submit' />
                    </div>
                }

            </form>
        </>
    )
}

export default UserProfile