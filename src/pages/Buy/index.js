import { useState } from "react";
import styles from "./Buy.module.css";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import Header from "../../components/Header";
import produtosMock from "../../utils/produtosMock";
import Categoria from "../../components/Categoria";
import Loading from "../../components/Loading";

function Buy() {
    
    const [loading1, setLoading1] = useState(true)
    document.body.style.backgroundColor = "rgb(21 32 149)";
    setTimeout(() => {
      setLoading1(false)
    }, 1000)
  // Estado para a pesquisa e a categoria selecionada. A const "Pesquisa esta setada com os nosso Mock de produtos para que mesmo que não tenha nenhum valor de pesquisa, apareçam todos produtos"
  const [pesquisa, setPesquisa] = useState(produtosMock);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  // Função dispara pelo input de pesquisa para filtrar os produtos com base no valor digitado. O valor entra na const "valorPesquisa", sendo formatada para tudo em maiusculo para melhor compatibilidade. Logo em seguida a Const "produtosFiltrados", recebe o "produtosMock" com .filter, determinando que cada objeto dentro do array, seja determinado como (produto), usamos aplicamos algumas configurações (.categoria e .name) e logo em seguida o .inclues e dentro dos ( ) a const que recebeu o valor do input da pesquisa. Seria algo como "a categoria do produto(Toda minuscula) é a que foi pesquisada?" Temos o .name e o .categoria separados por um || para caso um dos dois for true essa função irar setar no "setPesquisa" o valor que saiu na const "produtosFiltrados"
  function filtrarProdutos(evento) {
    const valorPesquisa = evento.target.value.toLowerCase();

    const produtosFiltrados = produtosMock.filter(
      (produto) =>
        produto.categoria.toLowerCase().includes(valorPesquisa) ||
        produto.name.toLowerCase().includes(valorPesquisa)
    );

    setPesquisa(produtosFiltrados);
  }

  // Função que é executada somente quando o usuario selecionar com click nos paragrafos. Ao clicar nos paragrafos, essa função é executada, assim o valor colocado no onClick, é setado na função entre os ( ), que logo depois declara uma const que armazena o "produtosMock" com .filter novamente, que ira definir os objetos (produtos), dentro dele como (produtos), em seguida fazemos que produto.categoria é identico a categoria, que no caso foi o valor do <p> clicado. Então setamos no "setPesquisa" com "produtosFiltrados" que contem exatamente a categoria clicada. setamos tbm no "setCategoriaSelecionada" o valor atual da categoria para uso futuros talvez
  function filtrarPorCategoria(categoria) {
    carregar();
    const produtosFiltrados = produtosMock.filter(
      (produto) => produto.categoria === categoria
    );

    setPesquisa(produtosFiltrados);
    setCategoriaSelecionada(categoria);
  }
  const [Load, setLoad] = useState(false);

  const carregar = (event) => {
    setLoad(true);

    setTimeout(() => {
      setLoad(false);
    }, 200);
  };
  const [loading, setLoading] = useState(true)
  document.body.style.backgroundColor = "rgb(21 32 149)";
  setTimeout(() => {
    setLoading(false)
  }, 500)
  // Links de navegação por categoria
  const links = (
    <>
      <p
        onClick={() => {
          filtrarPorCategoria("Banheiro");
          carregar();
        }}
      >
        Banheiro
      </p>
      <p
        onClick={() => {
          filtrarPorCategoria("Outros");
          carregar();
        }}
      >
        Outros
      </p>
      <p
        onClick={() => {
          filtrarPorCategoria("Quarto");
          carregar();
        }}
      >
        Quarto
      </p>
      <p
        onClick={() => {
          filtrarPorCategoria("Sala de Estar");
          carregar();
        }}
      >
        Sala de Estar
      </p>
      <p
        onClick={() => {
          filtrarPorCategoria("Cozinha");
          carregar();
        }}
      >
        Cozinha
      </p>
    </>
  );

  // Apenas para caso se não tiver nada escrita, indique que possa ser escrito algo, se o usuario escrever, apaga isso
  const categoriaAtual =
    pesquisa.length > 0 ? "Pesquise pela categoria ou nome de seu produto" : "";

  return (
    <section className={styles.Buy}>
      <Header />
      <Banner />
      {loading ? ( <Loading /> ) : (
        <>
      <div>
        <input
          type="search"
          placeholder="Pesquisar..."
          // caso aja uma mudança no input, executa a função de pesquisa com o texto colocado
          onChange={filtrarProdutos}
        />
      </div>
      {Load ? (    <Loading /> ) : (
        <Categoria navegação={links} Need_AlgumaCategoria={categoriaAtual}>
          {pesquisa.map((produto) => (
            <Card key={produto.id} item={produto} />
          ))}
        </Categoria>
      )}
      </>
    )}
    </section>
  )
}
  
  
  

export default Buy;
