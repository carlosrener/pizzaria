import { useState, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import { Header } from "../../components/ui/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
//import logoImg from "../../public/logo.svg";

type ItemProps = {
  id: string;
  name: string;
};
interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const image = e.target.files[0];

    if (!image) {
      return;
    }
    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  }
  //chama essa função quando vc selcionar uma no vacategoria na lista
  function handleChangeCategory(e) {
    // console.log('Posicao da categoria selecionada', categories[e.target.value])
    setCategorySelected(e.target.value);
  }

  async function handleProduct(e: FormEvent) {
    e.preventDefault();
    //cadastrar produto no banco de dados usando a nossa api
    try {
      const data = new FormData();
      if (
        name === "" ||
        price === "" ||
        description === "" ||
        imageAvatar === null
      ) {
        toast.error("preenha todos os campos");
        return;
      }

      data.append("name", name);
      data.append("price", price);
      data.append("description", description);
      data.append("category_id", categories[categorySelected].id);
      data.append("file", imageAvatar);

      const apiclient = setupAPIClient();
      await apiclient.post("/product", data);
      toast.success("Cadastrado com Sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("ops: erro ao cadastrar");
    }

    setName("");
    setPrice("");
    setDescription("");
    setImageAvatar(null);
    setAvatarUrl("");
  }

  return (
    <>
      <Head>
        <title>Novo Produto - Pizzaria rener</title>
      </Head>

      <div>
        <Header />
        <main className={styles.container}>
          <h1>Novo Produto</h1>

          <form className={styles.form} onSubmit={handleProduct}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} color="#fff" />
              </span>

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {avatarUrl && (
                <Image
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do Produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              placeholder="Digite o Nome do Produto"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Digite o Preço do Produto"
              className={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              placeholder="Descreva seu Produto..."
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className={styles.button} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

//lado servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiclient = setupAPIClient(ctx);
  const response = await apiclient.get("/category");

  // console.log(response.data)

  return {
    props: {
      categoryList: response.data,
    },
  };
});
