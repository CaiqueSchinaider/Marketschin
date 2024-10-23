import { useState } from "react";
import Banner from "../../components/Banner";

import Header from "../../components/Header";

import styles from "./Home.module.css";
import Loading from "../../components/Loading";

function Home() {
  const [loading, setLoading] = useState(true)
  document.body.style.backgroundColor = "rgb(21 32 149)";
  setTimeout(() => {
    setLoading(false)
  }, 500)
  
  return (
    <>
    
      <Header/>
      <Banner />
      {loading ? ( <Loading /> ) : (
      <section className={styles.Home}>
        <section>
          <h1>Você já conhece a nossa loja?</h1>
          <p>
            A <strong>Market Schin</strong> foi fundada com o compromisso de
            fortalecer a relação entre consumidores e produtores.
          </p>{" "}
          <p>
            {" "}
            Atuamos como intermediários confiáveis, assegurando um transporte
            eficiente, pagamentos seguros e a qualidade de nossos produtos!
          </p>
        </section>
        <inside>
          <h2>Confira nossos serviços &#9660; &#9660; &#9660; </h2>
          <nav>
            <a href="#">
              <p>Comprar</p>
            </a>
            <a href="#">
              <p>Vender</p>
            </a>
            <a href="#">
              <p>Ajuda</p>
            </a>
          </nav>
          <div className="slide">
            <img src=" "></img>
            <img src=" "></img>
            <img src=" "></img>
            <img src=" "></img>

          </div>
        </inside>
      </section>
      )}
    </>
    
  );}



export default Home;
