import { Link } from "react-router-dom";
import Container from "../Container";
import styles from "./Card.module.css";

function Card({ item }) {
  const valorformatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(item.valor);
  return (
    <Container>
      <Link to={`/produto/${item.id}`} style={{ textDecoration: "none" }}>
        <section className={styles.Card}>
          <img src={item.thumb}></img>

          <p>
            <span>{item.name}</span>
            <h2>{valorformatado}</h2>
          </p>
        </section>
      </Link>
    </Container>
  );
}
export default Card;
