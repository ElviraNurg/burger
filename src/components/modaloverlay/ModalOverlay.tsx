import styles from './modalOverlay.module.css';
import { createPortal } from 'react-dom';

const ModalOverlay = ({ active, children, setActive }: any) => {

    const modalClass = active ? styles.active : styles.modal;
    const modalRoot = document.getElementById('modal')as HTMLElement;
    
    
    return modalRoot? createPortal(
        <div className={`${modalClass}`} onClick={() => setActive(false)}>
            {children }
        </div>,
        modalRoot
    ):null
}

export default ModalOverlay