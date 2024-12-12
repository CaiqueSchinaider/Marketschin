import { useState, useEffect } from 'react';
import Banner from '../../components/Banner';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import Carroseul from '../../components/Carousel';
import styles from './Home.module.css';

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define o fundo da página
    document.body.style.backgroundColor = 'rgb(21, 32, 149)';
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    // Cleanup do timeout ao desmontar o componente
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Header />
      <Banner page="Home" />
      {loading ? (
        <Loading />
      ) : (
        <main className={styles.HomePage}>
          {/* Descrição da loja */}
          <section className={styles.PlatformDescription}>
            <h1>Você já conhece a nossa loja?</h1>
            <p>
              A <strong className={styles.MarketName}>Market Schin</strong> foi
              fundada com o compromisso de fortalecer a relação entre{' '}
              <strong>consumidores</strong> e <strong>produtores</strong>.
            </p>
            <p>
              Atuamos como intermediários <strong>confiáveis</strong>,
              assegurando um transporte <strong>eficiente</strong>, pagamentos{' '}
              <strong>seguros</strong> e a <strong>qualidade</strong> de nossos
              produtos!
            </p>
          </section>

          {/* Iframe */}

          {/* Slides de itens disponíveis */}
          <section className={styles.ProductsSlides}>
            <Carroseul />
          </section>
        </main>
      )}
      <Footer />
    </>
  );
}

export default Home;
