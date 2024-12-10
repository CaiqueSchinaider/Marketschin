import styles from './Carroseul.module.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { listProductsContext } from '../../contexts/MockProdutos';
function Carroseul() {
  const [listProducts] = useContext(listProductsContext);
  return (
    <inside className={styles.Carroseul}>
      <nav>
        <Link to={'/comprar/all'}>
          <p>Produtos</p>
        </Link>
        <Link to={'/#'}>
          <p>Vender</p>
        </Link>
        <Link to={'/#'}>
          <p>Ajuda</p>
        </Link>
      </nav>

      <Carousel
        className={styles.Juntante}
        showThumbs={false}
        interval={5000}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
      >
        {listProducts.map((products) => {
          return (
            <Link
              to={`/comprar/${products.categoria}`}
              style={{ boxShadow: 'inset 2px 2px 10px black' }}
            >
              <div key={products.id}>
                <img
                  src={products.thumb}
                  alt="foto de produto"
                  style={{ width: '250px', height: '250px' }}
                />

                <section>
                  <h3>
                    {' '}
                    {Number.parseFloat(products.valor).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </h3>
                  <p
                    style={{
                      width: '200px',
                      display: 'inline',
                      fontSize: '1.4rem',
                    }}
                  >
                    {products.name}
                  </p>
                  <Link to={`/produto/${products.id}`}>Comprar</Link>
                </section>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </inside>
  );
}

export default Carroseul;
