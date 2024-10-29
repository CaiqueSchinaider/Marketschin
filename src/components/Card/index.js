import { Link } from "react-router-dom";
import Container from "../Container";
import styles from "./Card.module.css";
import Product from "../Product";

function Card({ item }) {
  const valorformatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(item.valor);
  return (
    <Container>
      <section className={styles.Card}>
        <Link to={`/produto/${item.id}`}>
          <img src={item.thumb}></img>
        </Link>
        <p>
          <span>{item.name}</span>
          <h2>{valorformatado}</h2>
        </p>
      </section>
    </Container>
  );
}
export default Card;
