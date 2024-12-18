import { Link } from 'react-router-dom';
import styles from './FinishBuy.module.css';

function FinishBuy() {
  const listCart = JSON.parse(localStorage.getItem('listcart'));
  const CurrentBalance = listCart.reduce(
    (current, initialvalue) => current + Number(initialvalue.valor),
    0,
  );
  if (listCart) {
    console.log(listCart);
  }
  return listCart && CurrentBalance ? (
    <main className={styles.FinishPage}>
      <section className={styles.InfoCheck}>
        <div className={styles.ItensPurchased}>
          <h3>Itens no Carrinho ({listCart.length})</h3>
          <section className={styles.ItensList}>
            {listCart.map((product) => (
              <Link
                to={`/produto/${product.id}`}
                style={{ color: 'white', textDecoration: 'none' }}
              >
                <div key={product.id}>
                  <section>
                    <p>{product.name}</p>
                    <p
                      style={{
                        color: '#9b0202',
                        fontFamily: 'Bebas Neue',
                        fontSize: 'clamp(23px, 2.4vw, 3vw)',
                      }}
                    >
                      {Number(product.valor).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}{' '}
                    </p>
                  </section>
                  <img src={product.thumb} alt="imagem produto"></img>
                </div>
              </Link>
            ))}
          </section>
        </div>

        <div className={styles.PriceInfo}>
          <h2> Itens </h2>
          <div className={styles.priceList}>
            <ul>
              {listCart.map((product) => (
                <li>
                  {product.name} -{' '}
                  {Number(product.valor).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <nav>
          <Link to="/comprar/all">
            <button> Continuar Comprando</button>
          </Link>
          <Link to="/carrinho/none">
            <button> Voltar para o carrinho</button>
          </Link>
          <button> Finalizar Compra</button>{' '}
          {/* Levara para pagina de Finalização e pagamento (Precisa de um BackEnd)*/}
        </nav>
      </section>
    </main>
  ) : (
    <></>
  );
}

export default FinishBuy;
