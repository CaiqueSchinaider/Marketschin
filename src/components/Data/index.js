import { useContext, useState } from "react";
import styles from "./Data.module.css";
import { ParamsCodeContext } from "../../contexts/ParamsCode";
import Loading from "../Loading";
import { Link } from "react-router-dom";

function Data() {
  const [paramscode, setParamscode] = useContext(ParamsCodeContext);
  console.log(`esse é ${paramscode}`);
  return paramscode ? (
    <main className={styles.Data}>
      <h1>Usuario</h1>
      <div className={styles.LineDatas}>
        <section className={styles.DadosPessoais}>
          <h2>Dados Pessoais</h2>
          <h3>Informações de Login</h3>
          <p>
            <strong> Email:</strong> {paramscode.destino}
          </p>
          <p>
            <strong> Senha:</strong> {paramscode.senha}
          </p>
          <Link to="/emailverification">Redefinir senha</Link>
        </section>
        <section className={styles.DadosBancarios}>
          <h2>Dados Bancarios</h2>
          <h3>Cartões</h3>
          <Link to="/addcard">
            Adcionar cartão <img src="/pic/addcard.png" />
          </Link>
        </section>
      </div>
    </main>
  ) : (
    <Loading />
  );
}

export default Data;
