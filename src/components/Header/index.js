import Buy from "../../pages/Buy";
import styles from "./Header.module.css";
import { Link } from "react-router-dom"; // Corrigido o caminho do import

function Header() {
  return (
    <header className={styles.Header}>
      <span>
        <Link to="/home">
          <h1>Market Schin</h1>
        </Link>
      </span>
      <nav>
        <a href="/home">
          <img src="/pic/home.png" alt="Home" />
        </a>
        <a href="/comprar">
          <img src="/pic/cart.png" alt="Cart" />
        </a>
      </nav>
    </header>
  );
}

export default Header;
