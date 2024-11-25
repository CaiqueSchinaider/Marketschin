import { useContext, useEffect, useState } from "react";
import Logar from "../../components/Logar";
import styles from "./Login.module.css";
import Registrar from "../../components/Registrar";
import Loading from "../../components/Loading";

import { LoginsContext } from "../../contexts/Logins";
import { Link } from "react-router-dom";

function Login() {
  // Meu useContext, serve para quando o usuario registrar, mande sinal para ir para login
  const [login, setLogin] = useContext(LoginsContext);

  // Serve como sinal para identificar se o usuario quer ir para qual pagina de registro (login ou Registrar)
  const [registro, setRegistro] = useState("sinal_Login");

  // Usado para saber quando load deve ser chamado
  const [load, setLoad] = useState(true);

  /////////////////////////////////////////////////////////////

  useEffect(() => {
    setTimeout(function () {
      setLoad(false);
    }, 700);
  }, [registro]);

  /////////////////////////////////////////////////////////////

  return load ? (
    <Loading />
  ) : (
    <section className={styles.Login}>
      <section className={styles.Pai}>
        <header>
          <h1> Market Schin</h1>
        </header>

        {/* Variação de login e registro */}
        {registro == "sinal_Login" || login ? (
          <Logar />
        ) : registro == "sinal_Registrar" ? (
          <Registrar />
        ) : (
          <> </>
        )}

        <aside>
          <Link to="/relembrar" style={{ textDecoration: "none" }}>
            <p>Esqueci a senha</p>
          </Link>
          {registro == "sinal_Login" ? (
            <p onClick={() => setRegistro("sinal_Registrar")}>Criar conta</p>
          ) : registro == "sinal_Registrar" ? (
            <p onClick={() => setRegistro("sinal_Login")}>Ja tenho conta</p>
          ) : null}
        </aside>
      </section>
    </section>
  );
}
export default Login;
