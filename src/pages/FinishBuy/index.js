import { Link } from 'react-router-dom';
import styles from './FinishBuy.module.css';

function FinishBuy() {
  const listCart = JSON.parse(localStorage.getItem('listcart'));

  if (listCart) {
    console.log(listCart);
  }
  return listCart ? (
    <main className={styles.FinishPage}>
      <section className={styles.Transaction}>
        <div className={styles.CurrentBalance}>
          {' '}
          <h2>Saldo Atual</h2>
          <p></p>
        </div>

        <img src="/pic/Back.png" alt="arrow"></img>

        <div className={styles.PostPurchase}>
          <h2>Saldo Pós</h2>
        </div>
      </section>

      <section className={styles.InfoCheck}>
        <div className={styles.ItensPurchased}>
          <h3>Itens Comprados ({listCart.length})</h3>
          {listCart.map((product) => (
            <Link
              to={`/produto/${product.id}`}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              <div key={product.id}>
                <section>
                  <p>{product.name}</p>
                  <p style={{ color: '#9b0202' }}>
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
        </div>

        <div className={styles.PriceInfo}> Informação do Preço</div>

        <button> Finalizar Compra</button>
      </section>
    </main>
  ) : (
    <></>
  );
}

export default FinishBuy;
