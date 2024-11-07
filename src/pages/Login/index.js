import { useEffect, useState } from "react";
import Logar from "../../components/Logar";
import styles from "./Login.module.css";
import Registrar from "../../components/Registrar";
import Loading from "../../components/Loading";

function Login() {
  const [registro, setRegistro] = useState("login");
  const [quallog, setQuallog] = useState(true);
  const [load, setLoad] = useState();
  useEffect(() => {
    if (registro == "login") {
      setQuallog(true);
    } else {
      setQuallog(false);
    }
  }, [registro]);
  return (
    <section className={styles.Login}>
      <section className={styles.Pai}>
        <header>
          <h1> Market Schin</h1>
        </header>
        {quallog ? <Logar /> : <Registrar />}

        <aside>
          <p>Esqueci a senha</p>
          {quallog ? (
            load ? (
              <Loading />
            ) : (
              <p onClick={() => setRegistro("registrar")}>Criar conta</p>
            )
          ) : (
            <p onClick={() => setRegistro("login")}>Ja tenho conta</p>
          )}
        </aside>
      </section>
    </section>
  );
}
export default Login;
