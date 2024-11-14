import { Children } from "react";
import Header from "../../components/Header";
import styles from "./User.module.css";

function User({ children }) {
  return (
    <div className={styles.User}>
      <div>
        <aside>
          <h1> Suas Informações</h1>
          <h2>Caique Schinaider</h2>
          <p>caiqueschinaiderrufinoviana@gmail.com</p>
          <p>***********</p>
        </aside>
        <nav className={styles.Navigation}>
          <button> Compras </button>
          <button> Vendas </button>
          <button> Compras </button>
          <button> Dados </button>
          <button> Sair </button>
        </nav>{" "}
      </div>
      <Header />

      <section>{children}</section>
    </div>
  );
}
export default User;
