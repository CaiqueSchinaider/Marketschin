import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  return (
    <section className={styles.PageNotFound}>
      <h1>ERROR 404</h1>
      <p>Pagina não encontrada!</p>
      <Link to="/">Voltar para Home</Link>
    </section>
  );
}
export default PageNotFound;
