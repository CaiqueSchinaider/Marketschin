import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './Cart.module.css';
import { useContext, useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { listProductsContext } from '../../contexts/MockProdutos';

function Cart() {
  const [listProducts] = useContext(listProductsContext);
  const whatSomeList = JSON.parse(localStorage.getItem('listacart'));
  const { productpurchased } = useParams();

  // Todos os useStates
  const [productSelected, setProductSelected] = useState();
  const [catchList, setCatchList] = useState(whatSomeList || []);
  const [sendSignal, setSendSignal] = useState(false);

  const [load, setLoad] = useState(false);
  const [notification, setNotification] = useState('block');
  const [priceTotal, setPriceTotal] = useState();

  function checkList() {
    const clear = JSON.parse(localStorage.getItem('clear'));

    if (productpurchased === 'none') {
      setProductSelected('none');
      setSendSignal(true);
      setNotification('none');
    } else {
      if (listProducts) {
        const findProduct = listProducts.find(
          (products) => products.id == productpurchased,
        );
        checkHaveItem(findProduct);
      }
    }
  }

  function checkHaveItem(item) {
    const haveItemID = catchList.find((products) => products.id == item.id);
    if (haveItemID) {
      addProduct(false);
    } else {
      addProduct(true, item);
    }
  }

  function addProduct(value, item) {
    setTimeout(() => {
      setNotification('none');
    }, 3000);
    if (value) {
      const list = catchList;
      const updateList = [...list, item];
      console.log(updateList);
      setCatchList(updateList);
      if (updateList) {
        setSendSignal(true);

        localStorage.setItem('listacart', JSON.stringify(updateList));
      }
    } else {
      setSendSignal(true);
    }
  }

  function deleteProductID(id) {
    const findProductDelete = catchList.find((product) => product.id == id);
    if (findProductDelete) {
      const deleteProduct = catchList.filter(
        (products) => products.id !== findProductDelete.id,
      );
      if (deleteProduct) {
        localStorage.setItem('listacart', JSON.stringify(deleteProduct));
        setCatchList(deleteProduct);
      }
    }
  }

  function deleteAllProducts() {
    const deleteProducts = [];
    setCatchList([]);

    if (deleteProducts) {
      localStorage.setItem('listacart', JSON.stringify(deleteProducts));
    }
  }

  useEffect(() => {
    checkList();
    setTimeout(() => {
      setLoad(true);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }, [listProducts]);

  return (
    <>
      {load ? (
        <>
          <Header />
          {sendSignal ? (
            <div className={styles.BuyCart}>
              <div
                className={styles.AlertNotification}
                style={{ display: `${notification}` }}
              >
                <p> Produto adicionado ao carrinho!</p>
              </div>
              <main>
                <aside>
                  <button
                    onClick={() => deleteAllProducts()}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src="/pic/excluir.png" alt="pic excluir" />

                    <p>Limpar carrinho </p>
                  </button>

                  <button>
                    <img src="/pic/market.png" alt="pic market" />
                    <Link to="/comprar/all">Continuar compras</Link>
                  </button>
                  <button
                    style={{
                      cursor: 'pointer',

                      fontWeight: 'bolder',
                    }}
                  >
                    <img src="/pic/confirm.png" alt="pic confirm" />
                    <p> Finalizar compras</p>
                  </button>
                  <div className={styles.PriceTotal}>
                    <p>
                      <strong>Preço total</strong>
                    </p>
                    <p>
                      {Number.parseFloat(priceTotal).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </div>
                </aside>
                <div className={styles.ProductsList}>
                  {catchList.map((product) => (
                    <section key={product.id}>
                      <div>
                        <Link
                          to={`/produto/${product.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <picture>
                            <img src={product.thumb} alt={product.name}></img>
                          </picture>
                        </Link>
                        <div>
                          <h2>{product.name}</h2>
                          <h3>
                            {Number.parseFloat(product.valor).toLocaleString(
                              'pt-br',
                              { style: 'currency', currency: 'BRL' },
                            )}
                          </h3>
                        </div>
                        <button
                          className={styles.DeleteButton}
                          onClick={() => deleteProductID(product.id)}
                          style={{ cursor: 'pointer' }}
                        ></button>
                      </div>
                      <button
                        onClick={() => deleteProductID(product.id)}
                        style={{ cursor: 'pointer' }}
                      ></button>
                    </section>
                  ))}
                </div>
              </main>
            </div>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Cart;
