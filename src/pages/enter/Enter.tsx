import { Link } from 'react-router-dom';
import AppHeader from "../../components/header/AppHeader";
import Title from '../../UI/title/Title';
import Input from "../../UI/input/input";
import Button from "../../UI/button/button";
import styles from './enter.module.css';
import { useTypedDispatch } from '../../hooks/useTypedSelector';
import useForm from "../../hooks/UseForm";
import { FormEvent } from 'react';
import { auth } from '../../store/auth/authSlice';
const Enter = () => {
    const dispatch = useTypedDispatch()
    const {values, onChange} = useForm();

    const getAuth=(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        values&&dispatch(auth(values))
    }
  
    
    return (
        <>
            <AppHeader />
            <Title text={'Вход'} />
            <form onSubmit={getAuth} className={styles.form}>
                <Input
                    onChange={onChange}
                    inputType='email'
                    inputName={'email'}
                    placeholder={'E-mail'}
                    value={values?.email} />
                <Input
                    inputType={'password'}
                    inputName={'password'}
                    placeholder={'Пароль'}
                    value={values?.password}
                    onChange={onChange} />
                <Button text={'Войти'}  type='submit'/>
            </form>
            <div className={styles.enter__box}>
                <p className={styles.enter__text}>Вы — новый пользователь?</p>
                <Link className={styles.enter__link} to={'/registration'}>Зарегистрироваться</Link>
            </div>
            <div className={styles.enter__box}>
                <p className={styles.enter__text}>Забыли пароль?</p>
                <Link className={styles.enter__link} to={'/RecoverPassword'}>Восстановить пароль</Link>
            </div>

        </>

    )
}

export default Enter