import { useContext, useEffect, useState } from "react";
import Logar from "../../components/Logar";
import styles from "./Login.module.css";
import Registrar from "../../components/Registrar";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { LoginsContext } from "../../contexts/Logins";

function Login() {
  const [login, setLogin] = useContext(LoginsContext);
  const [registro, setRegistro] = useState("login");
  const [quallog, setQuallog] = useState(true);
  const [load, setLoad] = useState(true);

  /////////////////////////////////////////////////////////////

  useEffect(() => {
    if (registro == "login") {
      setQuallog(true);
    } else {
      setQuallog(false);
    }

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
        {quallog || login ? <Logar /> : <Registrar />}

        <aside>
          <p>Esqueci a senha</p>
          {quallog ? (
            <p onClick={() => setRegistro("registrar")}>Criar conta</p>
          ) : (
            <p onClick={() => setRegistro("login")}>Ja tenho conta</p>
          )}
        </aside>
      </section>
    </section>
  );
}
export default Login;
