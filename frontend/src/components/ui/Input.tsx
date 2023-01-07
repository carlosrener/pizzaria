import styles from './input.module.scss';
import { InputHTMLAttributes, TextareaHTMLAttributes} from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
interface TextArea extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}:InputProps){
    return(
        <input className={styles.input} {...rest}/>
    )
}

export function TextArea({...rest}:TextArea){
    return(
        <textarea className={styles.input} {...rest}></textarea>
    )
}

//parei video 94 tempo 10:57