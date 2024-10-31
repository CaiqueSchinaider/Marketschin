import { useParams } from "react-router-dom";
import Header from "../Header";
import styles from "./Cart.module.css";
import produtos from "../../utils/produtosMock";
import { useEffect, useState } from "react";
import Loading from "../Loading";

function Cart() {
  const { produtocomprado } = useParams();
  const [selecionado, setSelecionado] = useState();
  const listaprodutos = [];

  useEffect(() => {
    const acharproduto = produtos.find(
      (produto) => produto.id === parseInt(produtocomprado)
    );

    setSelecionado(acharproduto);
    if (acharproduto) {
      salvarproduto();
    }
  }, [produtocomprado]);

  function salvarproduto() {
    if (selecionado) {
      listaprodutos.push({ id: selecionado.id });
      localStorage.setItem(listaprodutos, JSON.stringify(listaprodutos));
    }
  }
  return (
    <>
      <Header />
      {selecionado ? (
        <div className={styles.Cart}>
          <h1>Seu carrinho</h1>
          <main>
            <div className={styles.Paidetodas}>
              <section>
                <picture>
                  <img src={selecionado.thumb}></img>
                </picture>
                <div>
                  <h2>{selecionado.name}</h2>
                  <h3>{selecionado.valor}</h3>
                </div>
              </section>
              <section>
                <picture>
                  <img src={selecionado.thumb}></img>
                </picture>
                <div>
                  <h2>{selecionado.name}</h2>
                  <h3>{selecionado.valor}</h3>
                </div>
              </section>
            </div>
            <aside>pddddd</aside>
          </main>

          <aside>{/* aqui vai os dados dos itens  */}</aside>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Cart;
