import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AppHeader from "../../components/header/AppHeader";
import Title from '../../UI/title/Title';
import Input from "../../UI/input/input";
import Button from "../../UI/button/button";
import styles from '../enter/enter.module.css';
import { useTypedDispatch } from "../../hooks/useTypedSelector";
import { addRegValue, reg } from "../../store/auth/authSlice";
import { FormEvent } from "react";
import useForm from "../../hooks/UseForm";

const Registration = () => {
    const dispatch = useTypedDispatch()

    const {values, onChange} = useForm();
    
    const getReg = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        values&&dispatch(reg(values));
console.log(values);

    }
     
         useEffect(() => {
            values&&dispatch(addRegValue(values))
        }, [values])  
    return (
        <>
            <AppHeader />
            <Title text={'Регистрация'} />
            <form onSubmit={getReg} className={styles.form}>
                <Input
                    onChange={onChange}
                    inputType={'name'}
                    inputName={'name'}
                    placeholder={'Имя'}
                    value={values?.name} />
                <Input
                    onChange={onChange}
                    inputType={'email'}
                    inputName={'email'}
                    placeholder={'E-mail'}
                    value={values?.email} />
                <Input
                    inputType={'password'}
                    inputName={'password'}
                    placeholder={'Пароль'}
                    value={values?.password}
                    onChange={onChange} />
                <Button type="submit" text={'Зарегистрироваться'} />
            </form>
            <div className={styles.enter__box}>
                <p className={styles.enter__text}>Уже зарегистрированы?</p>
                <Link className={styles.enter__link} to={'/login'}>Войти</Link>
            </div>


        </>

    )
}

export default Registration