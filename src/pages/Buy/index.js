import { useContext, useEffect, useState } from 'react';
import styles from './Buy.module.css';
import Banner from '../../components/Banner';
import Card from '../../components/Card';
import Header from '../../components/Header';

import Categoria from '../../components/Category';

import { listProductsContext } from '../../contexts/MockProdutos';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { NotificationContext } from '../../contexts/Notification';
import Loading from '../../components/Loading';

function Buy() {
  //States
  const [notification] = useContext(NotificationContext);
  const { paramscategoria } = useParams();
  const [listProducts] = useContext(listProductsContext);
  const [products, setProducts] = useState(listProducts);
  const [category, setCategory] = useState('Todos');

  ////////////////////////////////////////////////

  // Filtrar produtos por pesquisa
  async function filterSearch(searchValue) {
    setCategory(searchValue);
    if (searchValue == '') {
      setProducts(listProducts);
      setCategory('Todos');
    } else {
      if (listProducts) {
        const productFilter = await listProducts.filter(
          (product) =>
            product.categoria.includes(searchValue) ||
            product.name.includes(searchValue),
        );
        if (productFilter) {
          setProducts(productFilter);
        }
      }
    }
  }
  ////////////////////////////////////////////////
  function deleteContent() {
    const inputSearch = document.getElementById('search');
    inputSearch.value = '';
    filterSearch('');
  }
  // Links para navegação
  const LINKS = (
    <>
      <button
        onClick={() => {
          filterSearch('Banheiro');
        }}
      >
        Banheiro
      </button>
      <button
        onClick={() => {
          filterSearch('Outros');
        }}
      >
        Outros
      </button>
      <button
        onClick={() => {
          filterSearch('Quarto');
        }}
      >
        Quarto
      </button>
      <button
        onClick={() => {
          filterSearch('Sala de Estar');
        }}
      >
        Sala de Estar
      </button>
      <button
        onClick={() => {
          filterSearch('Cozinha');
        }}
      >
        Cozinha
      </button>
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
      <ToastContainer />

      <>
        <div id="ponto">
          <input
            id="search"
            className={styles.Search}
            type="search"
            placeholder="Pesquisar..."
            onChange={(e) => filterSearch(e.target.value)}
          />
          <button
            className={styles.SearchDelete}
            onClick={() => deleteContent()}
          >
            <img src="/pic/excluir.png"></img>
          </button>
        </div>

        <Categoria navigation={LINKS} needSomeCategory={category}>
          {products.map((dataProduct) => (
            <Card key={dataProduct.id} item={dataProduct} />
          ))}
        </Categoria>
      </>
    </section>
  ) : (
    <Loading />
  );
}

export default Buy;
