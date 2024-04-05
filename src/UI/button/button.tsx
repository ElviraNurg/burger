import styles from './button.module.css';

type ButtonProps = {
    text: string;
    onClick?: ()=>void;
    type:"button"|"submit"|"reset"
}

const Button = ({ text,type, onClick }:ButtonProps) => {
   
   //const buttonType=parent==='enter'? styles.button__enter:styles.button__reg;

   const button=styles.button;
   
    return (
        <button type={type} onClick={onClick} className={ `${button}`}>{text}</button>
    )
}

export default Button