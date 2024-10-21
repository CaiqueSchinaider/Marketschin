import Container from "../Container";
import styles from "./Card.module.css";

function Card({ item }) {
  const valorformatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(item.valor);
  return (
    <Container>
      <section className={styles.Card}>
        <a href={item.link}>
          <img src={item.thumb}></img>
        </a>
        <p>
          <span>{item.name}</span>
          <h2>{valorformatado}</h2>
        </p>
      </section>
    </Container>
  );
}
export default Card;
