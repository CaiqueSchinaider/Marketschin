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
              A <strong>Market Schin</strong> foi fundada com o compromisso de
              fortalecer a relação entre consumidores e produtores.
            </p>
            <p>
              Atuamos como intermediários confiáveis, assegurando um transporte
              eficiente, pagamentos seguros e a qualidade de nossos produtos!
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
