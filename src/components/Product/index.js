import { useEffect, useState } from "react";
import produtos from "../../utils/produtosMock";
import Header from "../Header";
import styles from "./Product.module.css";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading";

function Product() {
  const { id } = useParams();
  const [produtoatual, setProdutoatual] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const filtrarproduto = produtos.find(
      (produto) => produto.id === parseInt(id)
    );
    setProdutoatual(filtrarproduto);
  }, [id]);

  useEffect(() => {
    setTimeout(() => setLoad(true), 800);
  }, []);

  if (!load) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      {produtoatual ? (
        <div className={styles.Product}>
          <aside>
            <figure>
              <a href={produtoatual.thumb} target="blank">
                <img src={produtoatual.thumb} alt={produtoatual.name} />
              </a>
            </figure>
            <article>
              <h1>{produtoatual.name}</h1>
              <p>
                {Number.parseFloat(produtoatual.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <Link to={`/carrinho/${produtoatual.id}`}>
                <button>Comprar</button>{" "}
              </Link>
              <p>Avaliação: ⭐⭐⭐⭐☆ (4.5)</p>
              <h2>Especificações</h2>
              <p>{produtoatual.especificacoes}</p>
            </article>
          </aside>

          <section>
            <h2>{produtoatual.name}</h2>
            <h3>
              <strong>
                {Number.parseFloat(produtoatual.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>
            </h3>
            <p>{produtoatual.descricao}</p>
            <h3>Especificações</h3>
            <p>{produtoatual.especificacoes}</p>
          </section>

          <nav>
            <Link
              to={`/comprar/${produtoatual.categoria}`}
              style={{ textDecoration: "none" }}
            >
              Ver relacionados
            </Link>
            <Link to="#" style={{ textDecoration: "none" }}>
              Ver carrinho
            </Link>
            <Link to="#" style={{ textDecoration: "none" }}>
              Fechar carrinho
            </Link>
            <Link to={`/comprar/all`} style={{ textDecoration: "none" }}>
              Voltar
            </Link>
          </nav>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Product;
