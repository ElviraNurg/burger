import styles from './titlemodal.module.css';
import { Dispatch } from 'react';
type Props = {
    text: string;
    setActive: Dispatch<React.SetStateAction<boolean>>;
    parent: string;
}
const TitleModal = ({ text, setActive, parent }: Props) => {
const titleClass=parent==='ingridientDetails'?`${styles.title} ${styles.title__ingridient}`: `${styles.title}`
const titleBoxClass=parent==='ingridientDetails'?`${styles.title__box} ${styles.title__box_ingridient}`: `${styles.title__box}`
    return (
        <div className={titleBoxClass}>
            <h3 className={titleClass}>
                {text}
            </h3>
            <button className={styles.modal__closed} onClick={() => setActive(false)}></button>
        </div>

    )
}

export default TitleModal