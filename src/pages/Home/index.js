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
            <h2 onClick={scrolar}>
              Confira nossos serviços &#9660; &#9660; &#9660;
            </h2>

            <nav>
              <Link to={"/comprar/all"}>
                <p>Comprar</p>
              </Link>
              <a href="#">
                <p>Vender</p>
              </a>
              <a href="#">
                <p>Ajuda</p>
              </a>
            </nav>
            <Carousel
              className="Carousel"
              autoPlay
              infiniteLoop
              showThumbs={false}
              interval={5000}
              showArrows={false}
              showStatus={false}
              showIndicators={false}
            >
              {produtos.map((produtosslide) => {
                return (
                  <Link
                    to={`/comprar/${produtosslide.categoria}`}
                    style={{ boxShadow: "inset 2px 2px 10px black" }}
                  >
                    <div key={produtosslide.id}>
                      <img
                        src={produtosslide.thumb}
                        style={{ width: "250px", height: "250px" }}
                      />
                      <section>
                        <h3>
                          {" "}
                          {Number.parseFloat(
                            produtosslide.valor
                          ).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </h3>
                        <p
                          style={{
                            width: "200px",
                            display: "inline",
                            fontSize: "1.4rem",
                          }}
                        >
                          {produtosslide.name}
                        </p>
                      </section>
                    </div>
                  </Link>
                );
              })}
            </Carousel>
          </inside>
        </section>
      )}
      <Footer />
    </>
  );
}

export default Home;
