import { Link } from "react-router-dom";
import styles from "./Registrar.module.css";

function Registrar() {
  return (
    <section className={styles.Registrar}>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" required />
        <label for="password">Senha</label>
        <input type="password" id="password" />
        <label for="confirmpassword">Confirme sua senha</label>
        <input type="password" id="confirmpassword" />
      </div>
      <nav>
        <Link to="/">
          <button>Entrar</button>
        </Link>
      </nav>
    </section>
  );
}

export default Registrar;
