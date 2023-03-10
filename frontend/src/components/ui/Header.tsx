import {useContext} from 'react'
import styles from "./header.module.scss";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/logo.svg";
import {FiLogOut} from 'react-icons/fi'
import { AuthContext } from "../../contexts/AuthContext";


export function Header(){
    const {signOut} = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
           <div className={styles.headerContent}>
            <Link href='/dashboard'>
                <Image src={logoImg} alt="Logo Pizza Rener" width={190} height={60}/>
            </Link>
            
            <nav className={styles.menuNav}>
                <Link href="/category" legacyBehavior>
                    <a>Categorias</a>
                </Link>
                <Link href="/product" legacyBehavior>
                    <a>Cardapio</a>
                </Link>

                <button onClick={signOut}>
                    <FiLogOut color="#fff" size={24}/>
                </button>
            </nav>
            
           </div> 
        </header>
    )
}