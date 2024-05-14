import styles from './titlemodal.module.css';
import { Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
type Props = {
    text: string;
    setActive: Dispatch<React.SetStateAction<boolean>>;
    parent: string;
}
const TitleModal = ({ text,  setActive, parent }: Props) => {
    const navigate=useNavigate();
const titleClass=parent==='ingridientDetails'?`${styles.title} ${styles.title__ingridient}`: `${styles.title}`
const titleBoxClass=parent==='ingridientDetails'?`${styles.title__box} ${styles.title__box_ingridient}`: `${styles.title__box}`;
const onClickClose = () => {
    setActive(false);
    navigate(parent==='FeedItemDetails'?'/feed':'/constructor')
}
    return (
        <div className={titleBoxClass}>
            <h3 className={titleClass}>
                {text}
            </h3>
            <button className={styles.modal__closed} onClick={onClickClose}></button>
        </div>

    )
}

export default TitleModal