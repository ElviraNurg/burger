import { Dispatch } from 'react';
import TitleModal from '../../UI/title-modal/TitleModal';
import ContentModal from '../../UI/contentmodal/ContentModal';
import styles from './modal.module.css';
import { Children } from 'react';

interface IModal {
    Children: JSX.Element;

}

const Modal = ({ Children }: IModal) => {

    return (
        <div className={styles.modal__content} onClick={e => e.stopPropagation()}>
            {Children}
        </div>
    )
}

export default Modal