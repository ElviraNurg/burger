import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from '../../hooks/useTypedSelector';
import styles from './modalOverlay.module.css';
import { createPortal } from 'react-dom';
import { useResize } from '../../hooks/useResize';
import AppHeader from '../header/AppHeader';
import { Dispatch } from 'react';
type ModalOverlayProps = {
    active: boolean;
    children: any;
    setActive: Dispatch<React.SetStateAction<boolean>>;
    parent?: string;
}
const ModalOverlay = ({ active, children, setActive, parent }: ModalOverlayProps) => {
    const navigate = useNavigate()
    const modalClass = active ? styles.active : styles.modal;
    const modalRoot = document.getElementById('modal') as HTMLElement;
    const size = useResize();
    console.log(parent);
    
    const onClickClose = () => {
        setActive(false);
        parent?navigate(parent):navigate('/')
    }
    return modalRoot ? createPortal(
        <div className={`${modalClass}`} onClick={onClickClose}>
            {!size.isScreenS && <AppHeader />}
            {children}
        </div>,
        modalRoot
    ) : null
}

export default ModalOverlay