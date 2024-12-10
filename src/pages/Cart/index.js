import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './Cart.module.css';
import { useContext, useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { listProductsContext } from '../../contexts/MockProdutos';

function Cart() {
  const [listProducts] = useContext(listProductsContext);
  const whatSomeList = JSON.parse(localStorage.getItem('lista'));
  const { productPurchased } = useParams();

  // Todos os useStates
  const [productSelected, setProductSelected] = useState();
  const [catchList, setCatchList] = useState(whatSomeList || []);
  const [sendSignal, setSendSignal] = useState(false);
  const [deleteProductID, setDeleteProductID] = useState();
  const [deleteAllProducts, setDeleteAllProducts] = useState();
  const [load, setLoad] = useState(false);
  const [notification, setNotification] = useState('block');
  const [priceTotal, setPriceTotal] = useState();

  // useEffect que verifica qual é o item em questão
  useEffect(() => {
    if (productPurchased === 'none') {
      setProductSelected(true);
      setNotification('none');
    } else {
      setTimeout(() => {
        setNotification('none');
      }, 2800);
      if (listProducts) {
        const findProduct = listProducts.find(
          (product) => product.id === parseInt(productPurchased),
        );
        setProductSelected(findProduct);
      }
    }
  }, [productPurchased, listProducts]);

  // useEffect que verifica se o item já está na lista do carrinho
  useEffect(() => {
    if (productSelected && productPurchased !== 'none') {
      const haveThisProduct = catchList.find(
        (product) => product.id === parseInt(productSelected.id),
      );
      if (!haveThisProduct) {
        setSendSignal(true);
      }
    } else if (productSelected && productPurchased === 'none') {
      setSendSignal(false);
    }
  }, [productSelected]);

  // useEffect que atualiza a lista com o novo produto
  useEffect(() => {
    if (sendSignal) {
      const updateList = [...catchList, productSelected];
      setCatchList(updateList);
      localStorage.setItem('lista', JSON.stringify(updateList));
    }
  }, [sendSignal]);

  // useEffect para apagar produtos
  useEffect(() => {
    if (deleteProductID) {
      const productRemainder = catchList.filter(
        (product) => product.id !== deleteProductID,
      );
      setCatchList(productRemainder);
      localStorage.setItem('lista', JSON.stringify(productRemainder));
    }
  }, [deleteProductID]);

  useEffect(() => {
    if (deleteAllProducts === 'delete') {
      const listClear = [];
      setCatchList(listClear);
      localStorage.setItem('lista', JSON.stringify(listClear));
    }
  }, [deleteAllProducts]);
  useEffect(() => {
    const whatPrice = catchList.reduce(function (initialValue, product) {
      return initialValue + Number.parseFloat(product.valor);
    }, 0);
    setPriceTotal(whatPrice);
  }, [catchList]);
  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }, []);

  return (
    <>
      {load ? (
        <>
          <Header />
          {productSelected ? (
            <div className={styles.Cart}>
              <div
                className={styles.Notificação}
                style={{ display: `${notification}` }}
              >
                <p> Produto adicionado ao carrinho!</p>
              </div>
              <main>
                <aside>
                  <button
                    onClick={() => setDeleteAllProducts('delete')}
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
                    onClick={() => setDeleteAllProducts('delete')}
                    style={{
                      cursor: 'pointer',

                      fontWeight: 'bolder',
                    }}
                  >
                    <img src="/pic/confirm.png" alt="pic confirm" />
                    <p> Finalizar compras</p>
                  </button>
                  <div className={styles.Precototal}>
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
                <div className={styles.Paidetodas}>
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
                          className={styles.Xparatelefones}
                          onClick={() => setDeleteProductID(product.id)}
                          style={{ cursor: 'pointer' }}
                        ></button>
                      </div>
                      <button
                        onClick={() => setDeleteProductID(product.id)}
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
