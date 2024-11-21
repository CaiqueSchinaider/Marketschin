import { Children } from "react";
import Header from "../../components/Header";
import styles from "./User.module.css";
import Carroseul from "../../components/Carroseul";
import Data from "../../components/Data";

function User({ children }) {
  return (
    <div className={styles.User}>
      <Header />
      <div className={styles.Agrupamento}>
        {/* Info do Usuario  */}
        <aside className={styles.Infos}>
          <h1> Suas Informações</h1>
          <h2>Caique Schinaider</h2>
          <p>caiqueschinaiderrufinoviana@gmail.com</p>
          <p>***********</p>
        </aside>

        {/* Navegation  */}
        <nav className={styles.Navigation}>
          <button>
            <img src="/pic/market.png" /> <p>Compras</p>
          </button>
          <button>
            <img src="/pic/Sell.png" /> <p>Vendas</p>
          </button>
          <button>
            <img src="/pic/Person Security.png" /> <p>Conta</p>
          </button>
          <button>
            <img src="/pic/Settings.png" /> <p>Configuração</p>
          </button>
          <button>
            <img src="/pic/back.png" /> <p>Sair</p>
          </button>
        </nav>
      </div>

      {/* Slides de produtos disponiveis  */}
      <section className={styles.Caroseul}>
        <Data />
        {/* <Carroseul /> */}
      </section>
    </div>
  );
}
export default User;
