import Header from "../../components/Header";
import styles from "./Addcard.module.css";

function Addcard() {
  return (
    <section className={styles.Addcard}>
      <Header />
      <main className={styles.DadosCard}>
        <h1>Adicionar Cartão</h1>
        <label>
          Nome do titular
          <input type="text" />
        </label>
        <label>
          Número do Cartão
          <input type="text" />
        </label>
        <div>
          <label>
            Data de vencimento
            <input type="date" name="date" />
          </label>
          <label>
            (CVV)
            <input type="text" maxLength="3" name="cvv" />
          </label>
        </div>
        <label>
          CPF
          <input type="text" />
        </label>
      </main>
    </section>
  );
}

export default Addcard;
