import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./SendEmailVerification.module.css";
import { useContext, useEffect, useState } from "react";

import emailjs from "emailjs-com";
import axios from "axios";
import { ParamsCodeContext } from "../../contexts/ParamsCode";

function SendEmailVerification() {
  const navigate = useNavigate("");
  const [sinalEmail, setSinalEmail] = useState();
  const [sendemail, setSendemail] = useState();
  const [paramscode, setParamscode] = useContext(ParamsCodeContext);
  const [email, setEmail] = useState();
  const [code, setCode] = useState();
  const [inputerror, setInputerror] = useState("2px solid white");
  const [messageerror, setMessageerror] = useState("");
  const [nextstep, setNextstep] = useState();

  // 1° Passo - Definindo parametros de Email
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Definindo parametros de email
  async function ObterUsers() {
    try {
      const response = await axios.get(
        "https://67312aae7aaf2a9aff10029c.mockapi.io/users"
      );
      console.log("Dados Users pego", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao pegar dados", error.name);
    }
  }

  async function VerificarUsers() {
    const usermock = await ObterUsers();
    const user = await usermock.find((users) => users.email == email);
    if (user) {
      Enviar();
    } else {
      setInputerror("2px solid red");
      setMessageerror("- Não existe usuario com esse email -");
    }
  }
  function Enviar() {
    const codeAleatorio = Math.floor(Math.random() * 1000);
    const codeFormatado = codeAleatorio.toString().padStart(3, "0");
    console.log(codeFormatado);

    if (codeFormatado) {
      setSendemail({
        destino: email,
        message: codeFormatado,
      });
      setCode(codeFormatado);
      setSinalEmail(true);
    }
  }
  // Definiu o Email
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // 2° Passo - Enviando Email
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (sinalEmail) {
      emailjs
        .send(
          "service_4fgdqkh",
          "template_p7dxe3r",
          sendemail,
          "EkUYr-ANKIPXaINm6"
        )
        .then(
          console.log(
            "Email enviado!",

            setParamscode({ message: code, destino: email }),
            navigate(`/codeverification/forgout`)
          )
        )
        .catch((error) => console.error("Email não enviado", error.name));
    }
  }, [sinalEmail]);

  // Enviou email, além de definir o Usuario
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <section className={styles.SendEmailVerification}>
      <div className={styles.EmailInput}>
        <h2>Digite seu Email</h2>
        <p>{messageerror}</p>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          style={{ border: inputerror }}
        />

        <button onClick={() => VerificarUsers()}>Enviar</button>
      </div>
    </section>
  );
}

export default SendEmailVerification;
