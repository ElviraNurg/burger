import styles from './resetpass.module.css';
import Title from '../../UI/title/Title';
import Input from '../../UI/input/input';
import Button from '../../UI/button/button';
import AppHeader from '../../components/header/AppHeader';
import { Link} from 'react-router-dom';
import useForm from "../../hooks/UseForm";
import { FormEvent } from 'react';
import { useTypedDispatch} from '../../hooks/useTypedSelector';
import { resetPass } from '../../store/auth/authSlice';

const ResetPass = () => {
    const { values, onChange } = useForm();
    const dispatch=useTypedDispatch();
    const getNewPass = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('reset');

        values && dispatch(resetPass(values))
    }

    return (<>
        <AppHeader />
        <Title text={'Восстановление пароля'} />

        <form onSubmit={getNewPass} className={styles.form}>
            <Input
                inputType={'password'}
                inputName={'password'}
                placeholder={'Введите новый пароль'}
                value={values?.password}
                onChange={onChange} />
            <Input
                onChange={onChange}
                inputType={'text'}
                inputName={'code'}
                placeholder={'Введите код из письма'}
                value={values?.code} />
            <Button text={'Сохранить'} type='submit' />
        </form>
        <div className={styles.enter__box}>
            <p className={styles.enter__text}>Вспомнили пароль?</p>
            <Link className={styles.enter__link} to={'/login'}>Войти</Link>
        </div>

    </>)
}

export default ResetPass