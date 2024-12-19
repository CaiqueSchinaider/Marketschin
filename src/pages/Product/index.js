import { useContext, useEffect, useState } from 'react';

import Header from '../../components/Header';
import styles from './Product.module.css';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { listProductsContext } from '../../contexts/MockProdutos';

function Product() {
  const [listProducts] = useContext(listProductsContext);
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (listProducts) {
      const findProduct = listProducts.find((product) => product.id === id);
      setSelectedProduct(findProduct);
    }
  }, [id, listProducts]);

  useEffect(() => {
    setTimeout(() => setLoad(true), 800);
  }, []);
  useEffect(() => {
    const scroll = document.getElementById('ponto');
    if (scroll) {
      scroll.scrollIntoView({ behavior: 'smooth' });
    }
  });

  if (!load) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      {selectedProduct ? (
        <div className={styles.ProductData} id="ponto">
          <aside>
            <figure>
              <a href={selectedProduct.thumb} target="blank">
                <img src={selectedProduct.thumb} alt={selectedProduct.name} />
              </a>
            </figure>
            <article>
              <h1>{selectedProduct.name}</h1>
              <p>
                {Number.parseFloat(selectedProduct.valor).toLocaleString(
                  'pt-BR',
                  {
                    style: 'currency',
                    currency: 'BRL',
                  },
                )}
              </p>
              <Link to={`/carrinho/${selectedProduct.id}`}>
                <button>Comprar</button>{' '}
              </Link>
              <p>Avaliação: ⭐⭐⭐⭐☆ (4.5)</p>
              <h2 style={{ color: '#9b0202' }}>Especificações</h2>
              <p>{selectedProduct.especificacoes}</p>
            </article>
          </aside>

          <section>
            <h2>{selectedProduct.name}</h2>
            <h3>
              <strong>
                {Number.parseFloat(selectedProduct.valor).toLocaleString(
                  'pt-BR',
                  {
                    style: 'currency',
                    currency: 'BRL',
                  },
                )}
              </strong>
            </h3>
            <p>{selectedProduct.descricao}</p>
            <h3 style={{ color: '#9b0202' }}>Especificações</h3>
            <p>{selectedProduct.especificoes}</p>{' '}
            {/* ERRO DE DIGITAÇÂO NO DATABASE */}
          </section>

          <nav>
            <Link
              to={`/comprar/${selectedProduct.categoria}`}
              style={{ textDecoration: 'none' }}
            >
              Ver relacionados
            </Link>
            <Link to="/carrinho/none" style={{ textDecoration: 'none' }}>
              Ver carrinho
            </Link>
            <Link to="#" style={{ textDecoration: 'none' }}>
              Fechar carrinho
            </Link>
            <Link to={`/comprar/all`} style={{ textDecoration: 'none' }}>
              Voltar
            </Link>
          </nav>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Product;
