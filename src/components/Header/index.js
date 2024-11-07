import styles from "./Header.module.css";
import { Link } from "react-router-dom"; // Corrigido o caminho do import

function Header() {
  return (
    <header className={styles.Header}>
      <span>
        <Link to="/">Market Schin</Link>
      </span>

      <nav>
        <Link to="/">
          <img src="/pic/home.png" alt="Home" />
        </Link>
        <Link to="/comprar/all">
          <img src="/pic/sacola.png" alt="Perfil" />
        </Link>
        <Link to="/carrinho/none">
          <img src="/pic/cart.png" alt="Cart" />
        </Link>
        <Link to="/login">
          <img src="/pic/perfil.png" alt="Perfil" />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
