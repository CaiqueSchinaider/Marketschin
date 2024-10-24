import { useState } from "react";
import Banner from "../../components/Banner";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./Home.module.css";
import Loading from "../../components/Loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Autoplay } from "swiper/modules";

function Home() {
  const [loading, setLoading] = useState(true);
  document.body.style.backgroundColor = "rgb(21 32 149)";
  setTimeout(() => {
    setLoading(false);
  }, 500);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <>
      <Header />
      <Banner />
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
          <span>
            <h2>
              <h2>Confira nossos serviços &#9660; &#9660; &#9660; </h2>
            </h2>
          </span>
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
            <Slider {...settings}>
              <div>
                <img src="image1.jpg" alt="Foto 1" />
              </div>
              <div>
                <img src="image2.jpg" alt="Foto 2" />
              </div>
              <div>
                <img src="image3.jpg" alt="Foto 3" />
              </div>
            </Slider>
          </inside>
        </section>
      )}
      <Footer />
    </>
  );
}

export default Home;
