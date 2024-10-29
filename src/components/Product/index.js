import { useEffect, useState } from "react";
import produtos from "../../utils/produtosMock";
import Banner from "../Banner";
import Header from "../Header";
import styles from "./Product.module.css";
import { useParams } from "react-router-dom";
import Loading from "../Loading";

function Product() {
  const { id } = useParams();
  const [produtoatual, setProdutoatual] = useState(null);
  useEffect(() => {
    const filtrarproduto = produtos.find(
      (produto) => produto.id === parseInt(id)
    );
    setProdutoatual(filtrarproduto);
  }, [id]);

  return (
    <>
      <Header />
      <Banner />
      {produtoatual ? (
        <div className={styles.Product}>
          <aside>
            <figure>
              <img src={produtoatual.thumb} alt={produtoatual.name} />
            </figure>

            <article>
              <h1>{produtoatual.name}</h1>
              <button> Comprar </button> {/* Aqui vai parte da descrição */}
              <p>Avaliação: ⭐⭐⭐⭐☆ (4.5)</p>
            </article>
          </aside>

          <section>
            {" "}
            <h2>{produtoatual.name}</h2>
            <p> {produtoatual.descricao}</p>
            <h3>Especificações </h3>
            <p>{produtoatual.especificacoes}</p>
          </section>
          <nav>
            <a>Ver relacionados</a>
            <a>Fechar carrinho</a>
          </nav>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Product;
