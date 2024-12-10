import { useContext, useEffect, useState } from 'react';
import styles from './Buy.module.css';
import Banner from '../../components/Banner';
import Card from '../../components/Card';
import Header from '../../components/Header';

import Categoria from '../../components/Categoria';

import { listProductsContext } from '../../contexts/MockProdutos';

function Buy() {
  //States
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
  ////////////////////////////////////////////////

  return products ? (
    <section className={styles.Buy}>
      <Header />
      <Banner pagina="Produtos" />

      <>
        <div id="ponto">
          <input
            type="search"
            placeholder="Pesquisar..."
            onChange={(e) => filterSearch(e.target.value)}
          />
        </div>

        <Categoria navegação={LINKS} Need_AlgumaCategoria={filterSearch}>
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
