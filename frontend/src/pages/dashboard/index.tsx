import { useState } from "react";
import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/ui/Header";
import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "../../services/api";
import Modal from "react-modal";
import { ModalOrder } from "../../components/ui/ModalOrder";


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

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  };
};

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || []);

  //use states para ao modal
  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal(){
    setModalVisible(false)
  }

  async function handleOpenModalView(id: string) {
    const apiClient = setupAPIClient();
    const response = await apiClient.get("order/detail", {
      params: {
        order_id: id,
      },
    });
    setModalItem(response.data);
    setModalVisible(true);
  }

  async function handleFinishItem(id: string){
    const apiClient = setupAPIClient();

    await apiClient.put('/order/finish',{
      order_id: id,
    })

    const response = await apiClient.get('/order')
    setOrderList(response.data)

    setModalVisible(false)
  }

  async function handleRefreshOrders() {
    const apiclient = setupAPIClient();
    const response = await apiclient.get('/order');
    setOrderList(response.data)
  }

  //modal
  Modal.setAppElement("#__next");

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
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>

          <article className={styles.listOrders}>

            {orderList.length === 0 && (
              <span className={styles.emptyList}>Voce não tem pedido aberto...</span>
            )}

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
        {/* modal */}
        {modalVisible && (
          <ModalOrder
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          order={modalItem}
          handleFinishOrder={ handleFinishItem}/>
        )}
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

//parei no inicio do video 117
