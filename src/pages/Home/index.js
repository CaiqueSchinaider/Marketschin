import { useState, useEffect } from 'react';
import Banner from '../../components/Banner';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Carroseul from '../../components/Carousel';
import styles from './Home.module.css';

function Home() {
  return (
    <>
      <Header />
      <Banner page="Home" />

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
            Atuamos como intermediários <strong>confiáveis</strong>, assegurando
            um transporte <strong>eficiente</strong>, pagamentos{' '}
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

      <Footer />
    </>
  );
}

export default Home;
