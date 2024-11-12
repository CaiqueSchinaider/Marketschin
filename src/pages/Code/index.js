import { useContext, useEffect, useState } from "react";
import styles from "./Code.module.css";
import { LoginsContext } from "../../contexts/Logins";
import emailjs from "emailjs-com";
import { ParamsCodeContext } from "../../contexts/ParamsCode";
import axios from "axios";
import { ConfirmCodeContext } from "../../contexts/ConfirmCode";
import { useNavigate } from "react-router-dom";

function Code() {
  const navigate = useNavigate();
  const [code, setCode] = useContext(ConfirmCodeContext);
  const [login, setLogin] = useContext(LoginsContext);
  const [paramscode, setParamscode] = useContext(ParamsCodeContext);
  const [numeroCode, setNumeroCode] = useState();
  const [userCode, setUserCode] = useState();
  const [logcode, setLogcode] = useState();
  const [confirmação, setConfimação] = useState();
  const [inputerror, setInputerror] = useState("2px solid white");
  const [mensageerror, setMensageerror] = useState(
    "Digite seu código de confirmação"
  );
  const [color_mensagem_error, setColor_mensagem_error] = useState("white");
  useEffect(() => {
    if (code) {
      emailjs.init("EkUYr-ANKIPXaINm6");
      try {
        emailjs
          .send(
            "service_4fgdqkh",
            "template_4wzkgjr",
            paramscode,
            "EkUYr-ANKIPXaINm6"
          )
          .then(console.log("Enviou o email!"))
          .catch((error) => {
            console.error(
              "Erro ao enviar email:",
              JSON.stringify(error, null, 2)
            );
          });
      } catch (error) {
        console.error("Erro inesperado:", JSON.stringify(error, null, 2));
      }
    }
  }, [code]);
  function Verificar() {
    const code = paramscode.message;
    const email = paramscode.destino;
    const password = paramscode.senha;
    if (userCode == code) {
      setLogin(true);
      axios.post("https://67312aae7aaf2a9aff10029c.mockapi.io/users", {
        name: email,
        senha: password,
      });
      navigate("/login");
      setInputerror("2px solid red");
      setMensageerror("Digite seu código de confirmação");
      setColor_mensagem_error("white");
    } else {
      setInputerror("2px solid red");
      setMensageerror("Codigo errado!");
      setColor_mensagem_error("red");
    }
  }
  return (
    <section className={styles.Code}>
      <div>
        <h1>Código enviado!</h1>
        <h2>Verifique sua caixa de email!</h2>
        <p style={{ color: color_mensagem_error }}>{mensageerror}</p>
        <input
          type="text"
          onChange={(e) => setUserCode(e.target.value)}
          maxLength="3"
          style={{ border: inputerror }}
        ></input>

        <button onClick={() => Verificar()}>Confirmar</button>
      </div>
    </section>
  );
}

export default Code;
