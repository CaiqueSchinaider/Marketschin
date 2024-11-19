import { useState } from "react";
import Banner from "../../components/Banner";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./Home.module.css";
import Loading from "../../components/Loading";

import Slider from "react-slick";
import { Autoplay } from "swiper/modules";
import produtos from "../../utils/produtosMock";
import { Link } from "react-router-dom";
import Carroseul from "../../components/Carroseul";

function Home() {
  const [loading, setLoading] = useState(true);
  document.body.style.backgroundColor = "rgb(21 32 149)";
  setTimeout(() => {
    setLoading(false);
  }, 500);
  const scrolar = () => {
    document
      .getElementsByClassName("Carousel")[0]
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Header />
      <Banner pagina="Home" />
      {loading ? (
        <Loading />
      ) : (
        <main className={styles.Home}>
          {/* Falar um pouco sobre a loja */}
          <section className={styles.Descrição}>
            <h1>Você já conhece a nossa loja?</h1>
            <p>
              A <strong className={styles.LojaCitar}>Market Schin</strong> foi
              fundada com o compromisso de fortalecer a relação entre{" "}
              <strong>consumidores</strong> e <strong>produtores</strong>.
            </p>
            <p>
              Atuamos como intermediários <strong>confiáveis</strong>,
              assegurando um transporte
              <strong> eficiente</strong>, pagamentos <strong>seguros</strong> e
              a <strong>qualidade</strong> de nossos produtos!
            </p>
          </section>

          {/* Slides de item disponiveis para compras  */}
          <section className={styles.Carousel}>
            <Carroseul />
          </section>
        </main>
      )}
      <Footer />
    </>
  );
}

export default Home;
