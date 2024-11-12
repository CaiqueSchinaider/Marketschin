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
  const [logcode, setLogcode] = useState();
  const [confirmação, setConfimação] = useState();

  useEffect(() => {
    if (code) {
      const juntarnumeros = [];
      while (juntarnumeros.length < 4) {
        const numero = Math.floor(Math.random() * 10);
        juntarnumeros.push(numero);
      }
      const numeros = juntarnumeros.join("");

      // Pega os codigos ja no mock
      axios
        .get("https://67312aae7aaf2a9aff10029c.mockapi.io/codes")
        .then((Response) => {
          const verificando = Response.data.some((codes) => {
            return codes.code == String(numeros); // Aqui você precisa retornar o resultado da comparação
          });

          // Se sim, da erro, se não coloca no mock api
          if (verificando) {
            alert("Erro ao gerar codigo, pegue outro");
          } else {
            axios
              .post("https://67312aae7aaf2a9aff10029c.mockapi.io/codes", {
                code: numeros,
              })
              .then(alert("enviado"))
              .catch(alert("error"));
            setLogcode(numeros);
            const updateparam = [...paramscode];
            updateparam[0].message = String(numeros);
            emailjs.send(
              "service_4fgdqkh",
              "template_4wzkgjr",
              updateparam,
              "EkUYr-ANKIPXaINm6"
            );
          }
        })
        .catch(alert("error fatal"));
    }
  }, [code]);

  function Verificar() {
    // Pega o email e senha

    const email = paramscode.destino;
    const password = paramscode.senha;

    if (userCode == String(logcode)) {
      axios.post("https://67312aae7aaf2a9aff10029c.mockapi.io/users", [
        {
          name: email,
          senha: password,
        },
      ]);
      setLogin(true);
    } else {
      alert("Codigo errado!");
    }
  }

  return (
    <section className={styles.Code}>
      <div>
        <p>Digite seu codigo de confirmação</p>
        <input
          type="text"
          onChange={(e) => setUserCode(e.target.value)}
        ></input>

        <button onClick={() => Verificar()}>Confirmar</button>
      </div>
    </section>
  );
}

export default Code;
