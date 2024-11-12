import { Link, useNavigate } from "react-router-dom";
import styles from "./Registrar.module.css";
import { useState, useEffect, useContext } from "react";
import users from "../../utils/usersMock";
import axios from "axios";
import { LoginsContext } from "../../contexts/Logins";
import { ParamsCodeContext } from "../../contexts/ParamsCode";
import { ConfirmCodeContext } from "../../contexts/ConfirmCode";

function Registrar() {
  const navigate = useNavigate();
  const [login, setLogin] = useContext(LoginsContext);
  const [paramscode, setParamscode] = useContext(ParamsCodeContext);
  const [code, setCode] = useContext(ConfirmCodeContext);
  // States que recebem os valores dos inputs
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordConfimation, setPasswordConfimation] = useState("");
  ////

  // States que recebem valores de styles para mostra mensagem de error
  const [mensagem_error_password, setMensagem_error_password] =
    useState("hidden");
  const [mensagem_error_email, setMensagem_error_email] = useState("hidden");
  const [
    mensagem_error_passwordConfimation,
    setMensagem_error_passwordConfimation,
  ] = useState("hidden");
  ////

  // States que recebem valores de styles para os inputs em caso de erro
  const [input_error_password, setInput_error_password] = useState("none");
  const [input_error_email, setInput_error_email] = useState("none");
  const [input_error_passwordConfimation, setInput_error_passwordConfimation] =
    useState("none");
  ////

  // States que recebem valores se tem erro (boleanos)
  const [error_password, setError_password] = useState();
  const [error_email, setError_email] = useState();
  const [error_passwordConfimation, setError_passwordConfimation] = useState();
  ////

  // States que determina a mensagem que sera exibida de erro
  const [info_error_email, setInfo_error_email] = useState();
  const [info_error_password, setInfo_error_password] = useState();
  const [info_error_passwordConfirmation, setInfo_error_passwordConfimation] =
    useState();
  /////

  // State que serve para enviar sinal para o useEffect
  const [sinal, setSinal] = useState(false);
  /////

  // Verificação de email e senhas

  const verificar = () => {
    // Se a senha foi digitada
    if (password == "") {
      setError_password(false);
      setInfo_error_password("A senha é obrigatoria");

      // Se a senha tem no minimo 8 caracteres
    } else if (password.length < 8) {
      setError_password(false);
      setInfo_error_password("A senha deve conter no mínimo 8 caracteres");

      // Se a senha tem no minimo uma letra maisucula
    } else if (!/[A-Z]/.test(password)) {
      setError_password(false);
      setInfo_error_password("A senha deve conter letra maiusculas");

      // Se a senha tem no minimo uma letra minuscula
    } else if (!/[a-z]/.test(password)) {
      setError_password(false);
      setInfo_error_password("A senha deve conter letra minusculas");

      // Se tudo estiver ok
    } else {
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

    if (passwordConfimation == "") {
      setError_passwordConfimation(false);
      setInfo_error_passwordConfimation("Confime a senha!");
    } else if (passwordConfimation !== password) {
      setError_passwordConfimation(false);
      setInfo_error_passwordConfimation("As senhas não coincidem!");
    } else {
      setError_passwordConfimation(true);
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
      ////////
      if (!error_email) {
        setMensagem_error_email("visible");
        setInput_error_email("2px solid red");
      } else {
        setMensagem_error_email("hidden");
        setInput_error_email("none");
      }
      ////////
      if (!error_passwordConfimation) {
        setMensagem_error_passwordConfimation("visible");
        setInput_error_passwordConfimation("2px solid red");
      } else {
        setMensagem_error_passwordConfimation("hidden");
        setInput_error_passwordConfimation("none");
      }

      if (error_password && error_email && error_passwordConfimation) {
        axios
          .get("https://67312aae7aaf2a9aff10029c.mockapi.io/users")
          .then((Response) => {
            const dados_user = Response.data;
            const localizar_usuario = dados_user.some(
              (log_users) => log_users.name == email
            );
            if (localizar_usuario) {
              setInfo_error_email("Essa conta já existe!");
              setMensagem_error_email("visible");
              setInput_error_email("2px solid red");
            } else {
              converte();
              const codeFor = converte();
              const senhaFormatada = String(password);
              setParamscode({
                message: codeFor,
                destino: email,
                senha: senhaFormatada,
              });
              setCode(true);
              navigate("/code");
            }
          });
      }
    }
    setSinal(false);
  }, [sinal]);

  function converte() {
    const codeAleatorio = Math.floor(Math.random() * 1000);
    return codeAleatorio.toString().padStart(3, "0");
  }

  return (
    <form className={styles.Logar}>
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
      <div>
        <label for="confirmpassword">Confirme sua senha</label>
        <input
          type="password"
          id="confirmpassword"
          onChange={(e) => setPasswordConfimation(e.target.value)}
          style={{ border: `${input_error_passwordConfimation}` }}
        />
        <p
          className={styles.Msgerror}
          style={{ visibility: `${mensagem_error_passwordConfimation}` }}
        >
          {info_error_passwordConfirmation}
        </p>
      </div>
      <nav>
        <button
          type="button"
          style={{ cursor: "pointer" }}
          onClick={() => verificar()}
        >
          Criar
        </button>
      </nav>
    </form>
  );
}

export default Registrar;
