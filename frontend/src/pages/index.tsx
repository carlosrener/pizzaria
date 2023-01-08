import { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/home.module.scss";
import logoImg from "../../public/logo.svg";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Link from "next/link";
//import context
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  // recuperar o context
  const { signIn } = useContext(AuthContext);
  //recuperar dados do form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //recuperar dados loagins
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    let data = {
      email,
      password,
    };
    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Pizzaria Rener</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Pizza Rener" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu Nome"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Digite sua Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>

          <Link href="/signup" legacyBehavior>
            <a className={styles.text}>Não tem conta? Cadastra-se</a>
          </Link>
        </div>
      </div>
    </>
  );
}
