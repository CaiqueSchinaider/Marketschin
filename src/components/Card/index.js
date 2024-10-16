import Container from "../Container"
import styles from "./Card.module.css"

function Card({data}) {
    return(
        <Container>

            {data.map((item) =>
            <section className={styles.Card}>
            <a href={item.link}><img src={item.thumb}></img></a>
             <p>{item.name}<h2>R${item.valor}</h2></p>
            </section>
        )}

        </Container>
    );
}
export default Card
