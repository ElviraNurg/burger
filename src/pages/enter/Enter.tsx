import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from "../../components/header/AppHeader";
import Title from '../../UI/title/Title';
import Input from "../../UI/input/input";
import Button from "../../UI/button/button";
import styles from './enter.module.css';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useTypedSelector';
import useForm from "../../hooks/UseForm";
import { FormEvent, useEffect } from 'react';
import { auth, checkToken } from '../../store/auth/authSlice';
const Enter = () => {
    const authorized = useTypedSelector(store => store.auth.authUser);
    const prevLocation = useTypedSelector(store => store.location.location);

    const dispatch = useTypedDispatch()
    const { values, onChange } = useForm();
    const navigate = useNavigate()

    const refreshToken=localStorage.getItem('refreshToken');
    const getAuth = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        values && dispatch(auth(values));
       // refreshToken?dispatch(checkToken(refreshToken)):console.log('no token');
    }
    useEffect(() => {
        authorized && navigate('/')
    }, [authorized])

    useEffect(() => {
        authorized && prevLocation === '/constructor' && navigate(prevLocation);
    }, [authorized])
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
                <Button text={'Войти'} type='submit' />
            </form>
            <div className={styles.enter__box}>
                <p className={styles.enter__text}>Вы — новый пользователь?</p>
                <Link className={styles.enter__link} to={'/register'}>Зарегистрироваться</Link>
            </div>
            <div className={styles.enter__box}>
                <p className={styles.enter__text}>Забыли пароль?</p>
                <Link className={styles.enter__link} to={'/forgot-password'}>Восстановить пароль</Link>
            </div>

        </>

    )
}

export default Enter