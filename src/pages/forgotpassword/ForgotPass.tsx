import styles from './forgotpass.module.css';
import Title from '../../UI/title/Title';
import Input from '../../UI/input/input';
import Button from '../../UI/button/button';
import AppHeader from '../../components/header/AppHeader';
import { Link, useNavigate } from 'react-router-dom';
import useForm from "../../hooks/UseForm";
import { FormEvent, useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useTypedSelector';
import { forgotPass } from '../../store/auth/authSlice';
import { store } from '../../store';
const ForgotPass = () => {
    const dispatch = useTypedDispatch();
    const passFetchStatus = useTypedSelector(store => store.auth.forgotPassStatus);
    const navigate = useNavigate()
    const { values, onChange } = useForm();

    const getPass = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        values && dispatch(forgotPass(values))
    }
    useEffect(() => {
        passFetchStatus && navigate('/reset-password')
    }, [passFetchStatus])
    return (<>
        <AppHeader />
        <Title text={'Восстановление пароля'} />

        <form onSubmit={getPass} className={styles.form}>
            <Input
                onChange={onChange}
                inputType='email'
                inputName={'email'}
                placeholder={'E-mail'}
                value={values?.email} />
            <Button text={'Восстановить'} type='submit' />
        </form>
        <div className={styles.enter__box}>
            <p className={styles.enter__text}>Вспомнили пароль?</p>
            <Link className={styles.enter__link} to={'/login'}>Войти</Link>
        </div>
    </>)
}

export default ForgotPass