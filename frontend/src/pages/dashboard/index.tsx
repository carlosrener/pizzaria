import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import {Header} from '../../components/ui/Header'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Painel - Pizzaria rener</title>
      </Head>
      <div>
        <Header/>
        <h1>Painel</h1>
      </div>
    </>
  );
}

//estrutura de server side
export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
