import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import styles from "./Cart.module.css";
import produtos from "../../utils/produtosMock";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

function Cart() {
  const possiveListaExistente = JSON.parse(localStorage.getItem("lista"));
  const { produtocomprado } = useParams();

  // Todos os useStates
  const [produtoSelecionado, setProdutoSelecionado] = useState();
  const [listaRecebida, setListaRecebida] = useState(
    possiveListaExistente || []
  );
  const [enviarSinal, setEnviarSinal] = useState(false);
  const [apagarProduto, setApagarProduto] = useState();
  const [apagarProdutos, setApagarProdutos] = useState();
  const [load, setLoad] = useState(false);
  const [notify, setNotify] = useState("block");

  // useEffect que verifica qual é o item em questão
  useEffect(() => {
    if (produtocomprado == "none") {
      setProdutoSelecionado(true);
      setNotify("none");
    } else {
      setTimeout(() => {
        setNotify("none");
      }, 2800);

      const acharProduto = produtos.find(
        (produto) => produto.id === parseInt(produtocomprado)
      );

      setProdutoSelecionado(acharProduto);
    }
  }, [produtocomprado]);

  // useEffect que verifica se o item já está na lista do carrinho
  useEffect(() => {
    if (produtoSelecionado && produtocomprado !== "none") {
      const jaPossui = listaRecebida.find(
        (prod) => prod.id === parseInt(produtoSelecionado.id)
      );
      if (!jaPossui) {
        setEnviarSinal(true);
      }
    } else if (produtoSelecionado && produtocomprado == "none") {
      setEnviarSinal(false);
    }
  }, [produtoSelecionado]);

  // useEffect que atualiza a lista com o novo produto
  useEffect(() => {
    if (enviarSinal) {
      const updateLista = [...listaRecebida, produtoSelecionado];
      setListaRecebida(updateLista);
      localStorage.setItem("lista", JSON.stringify(updateLista));
    }
  }, [enviarSinal]);

  // useEffect para apagar produtos
  useEffect(() => {
    if (apagarProduto) {
      const excluiProduto = listaRecebida.filter(
        (produto) => produto.id !== apagarProduto
      );
      setListaRecebida(excluiProduto);
      localStorage.setItem("lista", JSON.stringify(excluiProduto));
    }
  }, [apagarProduto]);

  useEffect(() => {
    if (apagarProdutos === "delete") {
      const excluiProdutos = [];
      setListaRecebida(excluiProdutos);
      localStorage.setItem("lista", JSON.stringify(excluiProdutos));
    }
  }, [apagarProdutos]);

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  }, []);

  return (
    <>
      {load ? (
        <>
          <Header />
          {produtoSelecionado ? (
            <div className={styles.Cart}>
              <div
                className={styles.Notificação}
                style={{ display: `${notify}` }}
              >
                <p> Produto adicionado ao carrinho!</p>
              </div>
              <main>
                <div className={styles.Paidetodas}>
                  {listaRecebida.map((produto) => (
                    <section key={produto.id}>
                      <div>
                        <picture>
                          <img src={produto.thumb} alt={produto.name}></img>
                        </picture>
                        <div>
                          <h2>{produto.name}</h2>
                          <h3>{produto.valor}</h3>
                        </div>
                      </div>
                      <button onClick={() => setApagarProduto(produto.id)}>
                        Apagar
                      </button>
                    </section>
                  ))}
                </div>
                <aside>
                  <button onClick={() => setApagarProdutos("delete")}>
                    Limpar carrinho
                  </button>
                  <button>
                    <Link to="/comprar/all">Continuar compras</Link>
                  </button>
                </aside>
              </main>
            </div>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Cart;
