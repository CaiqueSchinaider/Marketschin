import { useContext, useEffect, useState } from 'react';
import styles from './Buy.module.css';
import Banner from '../../components/Banner';
import Card from '../../components/Card';
import Header from '../../components/Header';

import Categoria from '../../components/Category';

import { listProductsContext } from '../../contexts/MockProdutos';
import { useParams } from 'react-router-dom';

function Buy() {
  //States
  const { paramscategoria } = useParams();
  const [listProducts] = useContext(listProductsContext);
  const [products, setProducts] = useState(listProducts);
  ////////////////////////////////////////////////

  // Filtrar produtos por pesquisa
  function filterSearch(searchValue) {
    if (listProducts) {
      const productFilter = listProducts.filter(
        (product) =>
          product.categoria.includes(searchValue) ||
          product.name.includes(searchValue),
      );
      if (productFilter) {
        setProducts(productFilter);
      }
    }
  }
  ////////////////////////////////////////////////

  // Links para navegação
  const LINKS = (
    <>
      <p
        onClick={() => {
          filterSearch('Banheiro');
        }}
      >
        Banheiro
      </p>
      <p
        onClick={() => {
          filterSearch('Outros');
        }}
      >
        Outros
      </p>
      <p
        onClick={() => {
          filterSearch('Quarto');
        }}
      >
        Quarto
      </p>
      <p
        onClick={() => {
          filterSearch('Sala de Estar');
        }}
      >
        Sala de Estar
      </p>
      <p
        onClick={() => {
          filterSearch('Cozinha');
        }}
      >
        Cozinha
      </p>
    </>
  );

  useEffect(() => {
    setTimeout(() => {
      const target = document.getElementById('ponto');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (paramscategoria !== 'all') {
        filterSearch(paramscategoria);
      }
    }, 800);
  }, [paramscategoria]);
  ////////////////////////////////////////////////

  return products ? (
    <section className={styles.BuyPage}>
      <Header />
      <Banner page="Produtos" />

      <>
        <div id="ponto">
          <input
            type="search"
            placeholder="Pesquisar..."
            onChange={(e) => filterSearch(e.target.value)}
          />
        </div>

        <Categoria navegation={LINKS} needSomeCategory={filterSearch}>
          {products.map((dataProduct) => (
            <Card key={dataProduct.id} item={dataProduct} />
          ))}
        </Categoria>
      </>
    </section>
  ) : (
    <></>
  );
}

export default Buy;
