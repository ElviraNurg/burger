import { Dispatch } from 'react';
import TitleModal from '../../UI/title-modal/TitleModal';
import ContentModal from '../../UI/contentmodal/ContentModal';
import styles from './modal.module.css';
import { Children } from 'react';

interface IModal {
    setActive: Dispatch<React.SetStateAction<boolean>>;
    Children: JSX.Element;

}

const Modal = ({ setActive, Children }: IModal) => {

    return (
        <div className={styles.modal__content} onClick={e => e.stopPropagation()}>
            {Children}
        </div>
    )
}

export default Modal