import { useContext, useEffect, useState } from "react";
import styles from "./Code.module.css";
import { LoginsContext } from "../../contexts/Logins";
import emailjs from "emailjs-com";
import { ParamsCodeContext } from "../../contexts/ParamsCode";
import axios from "axios";
import { ConfirmCodeContext } from "../../contexts/ConfirmCode";

function Code() {
  const [code, setCode] = useContext(ConfirmCodeContext);
  const [login, setLogin] = useContext(LoginsContext);
  const [paramscode, setParamscode] = useContext(ParamsCodeContext);
  const [numeroCode, setNumeroCode] = useState();
  const [userCode, setUserCode] = useState();

  useEffect(() => {
    if (code == "criarCode") {
      const numero = Math.floor(Math.random() * 10);
      setNumeroCode(String(numero));
      const emailsend = (paramscode) => ({ ...paramscode, mensage: numero });
      emailjs.send(
        "service_4fgdqkh",
        "template_4wzkgjr",
        emailsend,
        "EkUYr-ANKIPXaINm6"
      );
    }
  });
  function verificar() {
    const email = paramscode.destinatario;
    const password = paramscode.senha;
    if (numeroCode == userCode) {
      axios.post("https://67312aae7aaf2a9aff10029c.mockapi.io/users", {
        name: email,
        senha: password,
      });
      setLogin(true);
    }
  }

  return (
    <section className={styles.Code}>
      <div>
        <p>Digite seu codigo de confirmação</p>
        <input type="text" onChange={setUserCode}></input>
        <button onClick={() => verificar}>Confirmar</button>
      </div>
    </section>
  );
}

export default Code;
