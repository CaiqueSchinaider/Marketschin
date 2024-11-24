import { useEffect, useState } from "react";
import styles from "./Relembrar.module.css";
import emailjs from "emailjs-com";
import axios from "axios";
import { Link } from "react-router-dom";

function Relembrar() {
  const [sendemail, setSendemail] = useState({});
  const [email, setEmail] = useState();
  const [mockdados, setMockdados] = useState();
  const [senhanew, setSenhanew] = useState();
  const [sinal, setSinal] = useState("");
  const [codes, setCodes] = useState();
  const [sinalEmail, setSinalEmail] = useState();
  const [messagecode, setMessagecode] = useState();

  /////////////////////////////////
  // Envio de Email
  useEffect(() => {
    if (sinalEmail) {
      emailjs
        .send(
          "service_4fgdqkh",
          "template_p7dxe3r",
          sendemail,
          "EkUYr-ANKIPXaINm6"
        )
        .then(console.log("Email enviado!"))
        .catch((error) => console.error("Email não enviado", error.name));
    }
    if (sinal == "digitar code") {
    }
  }, [sinal, sinalEmail]);
  /////////////////////////////////
  // Defini email
  function Verificar() {
    const codeAleatorio = Math.floor(Math.random() * 1000);

    const codeDD = codeAleatorio.toString().padStart(3, "0");

    setMessagecode(codeDD);
    if (codeDD) {
      setSendemail({
        destino: email,
        message: codeDD,
      });
      setSinalEmail(true);
      setSinal("digitar code");
    }
  }

  /////////////////////////////////
  async function Confirmar() {
    if (messagecode == codes) {
      setSinal("mostrar senha");

      const mock = await axios.get(
        "https://67312aae7aaf2a9aff10029c.mockapi.io/users"
      );
      const objetofinal = mock.data.find((datas) => datas.name == email);
      if (objetofinal) {
        setMockdados(objetofinal.senha);
      }
    }
  }
  /////////////////////////////////

  /////////////////////////////////
  return (
    /////////////////////////////////////////////////////////////

    <section className={styles.Relembrar}>
      {sinal == "" ? (
        <main>
          <label>
            Insira seu email
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <button onClick={() => Verificar()}>Enviar Código</button>
        </main>
      ) : /////////////////////////////////////////////////////////////
      sinal == "digitar code" ? (
        <main>
          <label>
            Digite o código
            <input
              className={styles.InputCode}
              type="text"
              maxLength="3"
              onChange={(e) => setCodes(e.target.value)}
            />
          </label>
          <button onClick={() => Confirmar()}>Confirmar</button>
        </main>
      ) : /////////////////////////////////////////////////////////////
      sinal == "mostrar senha" ? (
        <main className={styles.VerPassword}>
          <h2> Sua senha é: </h2>
          <p> {mockdados}</p>
          <Link to="/">Voltar para login</Link>
        </main>
      ) : (
        /////////////////////////////////////////////////////////////

        <></>
      )}
    </section>
  );
}

export default Relembrar;
