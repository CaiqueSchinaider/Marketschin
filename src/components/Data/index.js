import { useContext, useState } from "react";
import styles from "./Data.module.css";
import { ParamsCodeContext } from "../../contexts/ParamsCode";

function Data() {
  const [paramscode, setParamscode] = useContext(ParamsCodeContext);
  console.log(paramscode);
  return (
    <main className={styles.Data}>
      <h1>Usuario</h1>
      <section className={styles.Dados}>
        <h2>Dados Pessoais</h2>

        <h3>Informações de Login</h3>

        <a> Mudar senha </a>
        <h3>Dados Bancarios</h3>
      </section>
    </main>
  );
}

export default Data;
