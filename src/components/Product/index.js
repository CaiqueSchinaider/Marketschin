import { useEffect, useState } from "react";
import produtos from "../../utils/produtosMock";
import Banner from "../Banner";
import Header from "../Header";
import styles from "./Product.module.css";
import { Link, useParams } from "react-router-dom";
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
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 800);
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
              <button> Comprar </button> {/* Aqui vai parte da descrição */}
              <p>Avaliação: ⭐⭐⭐⭐☆ (4.5)</p>
              <h2>Especificações</h2>
              <p>{produtoatual.especificacoes}</p>
            </article>
          </aside>

          <section>
            {" "}
            <h2>{produtoatual.name} </h2>
            <h3>
              <strong>
                {Number.parseFloat(produtoatual.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>
            </h3>
            <p> {produtoatual.descricao}</p>
            <h3>Especificações </h3>
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
            {/* Adicionei o valor null (que na verdade é tratado como uma string) temporariamente, na pagina de compras verifica se o parametro da url é diferente de "null" se for diferente ele pega o parametro, se não ele usa todos produtos do Mock para exibir */}
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
