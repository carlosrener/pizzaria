import { useState } from "react";
import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/ui/Header";
import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "../../services/api";

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};
interface HomeProps {
  orders: OrderProps[];
}

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || []);

  function handleOpenModalView(id: string){
    alert('Id clicado ' + id)
  }

  return (
    <>
      <Head>
        <title>Painel - Pizzaria rener</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Ùltimos Pedidos</h1>
            <button>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>

          <article className={styles.listOrders}>
            {orderList.map((item) => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span>MESA {item.table}</span>
                </button>
              </section>
            ))}
          </article>
        </main>
      </div>
    </>
  );
}

//estrutura de server side
export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/order");
  //console.log(response.data)

  return {
    props: {
      orders: response.data,
    },
  };
});
