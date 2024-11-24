import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./Logar.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import users from "../../utils/usersMock";
import axios from "axios";
import { ParamsCodeContext } from "../../contexts/ParamsCode";

function Logar() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [paramscode, setParamscode] = useContext(ParamsCodeContext);
  const [email, setEmail] = useState("");
  const [mensagem_error_password, setMensagem_error_password] =
    useState("hidden");
  const [mensagem_error_email, setMensagem_error_email] = useState("hidden");
  const [input_error_password, setInput_error_password] = useState("none");
  const [input_error_email, setInput_error_email] = useState("none");
  const [error_password, setError_password] = useState();
  const [error_email, setError_email] = useState();
  const [sinal, setSinal] = useState(false);
  const [info_error_password, setInfo_error_password] = useState();
  const [info_error_email, setInfo_error_email] = useState();

  // Verificação de email e senha

  const verificar = () => {
    // Se a senha foi digitada
    if (password == "") {
      setError_password(false);
      setInfo_error_password("A senha é obrigatoria");
    }
    // Se tudo estiver ok
    else {
      setError_password(true);
    }

    /////////////////////////////////////////////////////////////////////////////

    // Se o email foi digitado
    if (email == "") {
      setError_email(false);
      setInfo_error_email("O email é obrigatorio!");

      // Se contém @gmail.com no final do email, e se é maior que 11 caracteres
    } else if (!email.endsWith("@gmail.com") || email.length < 11) {
      setError_email(false);
      setInfo_error_email("O email não é valido");

      // Se tudo estiver ok
    } else {
      setError_email(true);
    }

    //Sinaliza o inicio das mensagens
    setSinal(true);
  };

  useEffect(() => {
    if (sinal) {
      if (!error_password) {
        setMensagem_error_password("visible");
        setInput_error_password("2px solid red");
      } else {
        setMensagem_error_password("hidden");
        setInput_error_password("none");
      }
      if (!error_email) {
        setMensagem_error_email("visible");
        setInput_error_email("2px solid red");
      } else {
        setMensagem_error_email("hidden");
        setInput_error_email("none");
      }
      if (error_email && error_password) {
        axios
          .get("https://67312aae7aaf2a9aff10029c.mockapi.io/users")
          .then((response) => {
            const dados = response.data;
            const verificar = dados.some(
              (usersdata) =>
                usersdata.name == email && usersdata.senha == String(password)
            );

            const log_verificar_email = dados.some(
              (logdados) => logdados.name == email
            );
            const log_verificar_senha = dados.some(
              (logdados) => logdados.password == password
            );

            if (verificar) {
              navigate("/home");
              setParamscode({
                message: "",
                destino: email,
                senha: password,
              });
            } else if (!log_verificar_email) {
              setInfo_error_email("Essa conta não existe!");
              setMensagem_error_email("visible");
              setInput_error_email("2px solid red");
            } else if (!log_verificar_senha) {
              setInfo_error_password("Senha incorreta");
              setMensagem_error_password("visible");
              setInput_error_password("2px solid red");
            }
          });
      }
    }
    setSinal(false);
  }, [sinal]);

  return (
    <section className={styles.Logar}>
      <div className={styles.emaildiv}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ border: `${input_error_email}` }}
        />
        <p
          className={styles.Msgerror}
          style={{ visibility: `${mensagem_error_email}` }}
        >
          {info_error_email}
        </p>
      </div>

      <div id="passworddiv">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ border: `${input_error_password}` }}
        />
        <p
          className={styles.Msgerror}
          style={{ visibility: `${mensagem_error_password}` }}
        >
          {info_error_password}
        </p>
      </div>

      <nav>
        <button style={{ cursor: "pointer" }} onClick={() => verificar()}>
          Entrar
        </button>
      </nav>
    </section>
  );
}

export default Logar;
