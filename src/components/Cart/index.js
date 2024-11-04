import { useParams } from "react-router-dom";
import Header from "../Header";
import styles from "./Cart.module.css";
import produtos from "../../utils/produtosMock";
import { useEffect, useState } from "react";
import Loading from "../Loading";

function Cart() {
  ////////////////////////////////////////////////////////

  const possiveListaExistente = JSON.parse(localStorage.getItem("lista")); // Recebe uma possivel lista ja existente

  ///////////////////////////////////////////////////////

  // Todos useStates
  const { produtocomprado } = useParams();
  const [produtoSelecionado, setProdutoSelecionado] = useState();
  const [listaRecebida, setListaRecebida] = useState(
    // Se houver lista, pega ela. Se não, []
    possiveListaExistente || []
  );
  const [enviarSinal, setEnviarSinal] = useState("");
  const [apagarProduto, setApagarProduto] = useState();
  const [apagarProdutos, setApagarProdutos] = useState();

  // useEffect que verifica qual é o item em questão
  useEffect(() => {
    const acharProduto = produtos.find(
      (produto) => produto.id === parseInt(produtocomprado)
    );
    setProdutoSelecionado(acharProduto);
  }, [produtocomprado]);

  // useEffect que verifica se o item ja esta na lista do carrinho
  useEffect(() => {
    if (produtoSelecionado) {
      const jaPossui = listaRecebida.find(
        (prod) => prod.id === parseInt(produtoSelecionado.id)
      );
      if (!jaPossui) {
        setEnviarSinal(true);
      }
    }
  }, [produtoSelecionado]);

  // useEffect que verifica se o enviarSinal emitido acima é true ou false. (Em caso de true cria uma nova lista com o produto em questão, e guarda ela)
  useEffect(() => {
    if (enviarSinal) {
      const updateLista = [...listaRecebida, produtoSelecionado];
      setListaRecebida(updateLista);
      localStorage.setItem("lista", JSON.stringify(updateLista));
    }
  }, [enviarSinal]);

  // useEffect para apagar produtos
  useEffect(() => {
    const excluiProduto = listaRecebida.filter(
      (produto) => produto.id !== apagarProduto
    );
    setListaRecebida(excluiProduto);
    localStorage.setItem("lista", JSON.stringify(excluiProduto));
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
      const scrolar = document.getElementById("ponto");
      if (scrolar) {
        scrolar.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  });
  return (
    <>
      <Header />
      {produtoSelecionado ? (
        <div className={styles.Cart}>
          <h1 id="ponto">Seu carrinho</h1>
          <main>
            <div className={styles.Paidetodas}>
              {listaRecebida ? (
                listaRecebida.map((produto) => (
                  <section>
                    <div>
                      <picture>
                        <img src={produto.thumb}></img>
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
                ))
              ) : (
                <Loading />
              )}
            </div>
            <aside>
              <button onClick={() => setApagarProdutos("delete")}>
                Limpar carrinho{" "}
              </button>
            </aside>
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
