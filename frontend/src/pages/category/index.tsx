import { useState , FormEvent } from "react";
import Head from "next/head";
import { Header } from "../../components/ui/Header";
import styles from './styles.module.scss'
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { canSSRAuth } from "../../utils/canSSRAuth";



export default function Category(){
    const [category, setCategory] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        if(category === ''){
            return;
        }
        const apiClient = setupAPIClient();
        await apiClient.post('/category',{
            name: category
        })
        toast.success('Categoria Cadastrada com Sucesso ')
        setCategory('')
    }

    return(
        <>
            <Head>
                <title>Nova categoria</title>
            </Head>
            <div>
                <Header/>
                
                <main className={styles.container}>
                    <h1>Cadastrar Categoria</h1>

                    <form onSubmit={handleRegister} className={styles.form}>
                        <input 
                        type="text"
                        placeholder="Digite o nome da Categoria"
                        value={category}
                        onChange={ (e)=> setCategory(e.target.value)}
                        className={styles.input} />

                        <button className={styles.button} type="submit">Cadastrar</button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) =>{
    return {
        props: {}
    }
})