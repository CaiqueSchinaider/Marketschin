import { Link } from 'react-router-dom';
import Container from '../Container';
import styles from './Card.module.css';

function Card({ item }) {
  const valueFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(item.valor);
  return (
    <Container>
      <Link to={`/produto/${item.id}`} style={{ textDecoration: 'none' }}>
        <section className={styles.Card}>
          <img src={item.thumb} alt="Produto imagem"></img>

          <div className={styles.InfoCard}>
            <p> {item.name}</p>
            <h2>{valueFormatted}</h2>
            <button>adicionar ao carrinho</button>
          </div>
        </section>
      </Link>
    </Container>
  );
}
export default Card;
