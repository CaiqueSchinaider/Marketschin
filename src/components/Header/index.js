import styles from './Header.module.css';
import { Link } from 'react-router-dom'; // Corrigido o caminho do import

function Header() {
  return (
    <header className={styles.Header}>
      <span>
        <Link to="/">Market Schin</Link>
      </span>

      <nav>
        <Link to="/home">
          <img src="/pic/home.png" alt="pic home" />
        </Link>
        <Link to="/comprar/all">
          <img src="/pic/cart.png" alt="pic market" />
        </Link>
        <Link to="/carrinho/none">
          <img src="/pic/sacola.png" alt="pic cart" />
        </Link>
        <Link to="/user">
          <img src="/pic/perfil.png" alt="pic profile" />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
