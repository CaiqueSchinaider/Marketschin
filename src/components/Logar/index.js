import { Link } from "react-router-dom";
import styles from "./Logar.module.css";

function Logar() {
  return (
    <section className={styles.Logar}>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" required />
        <label for="password">Senha</label>
        <input type="password" id="password" />
      </div>
      <nav>
        <Link to="/">
          <button>Entrar</button>
        </Link>
      </nav>
    </section>
  );
}

export default Logar;
