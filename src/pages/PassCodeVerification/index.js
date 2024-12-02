import { useContext, useEffect, useState } from "react";
import styles from "./PassCodeVerification.module.css";
import emailjs from "emailjs-com";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ParamsCodeContext } from "../../contexts/ParamsCode";

function PassCodeVerification() {
  const { status } = useParams();
  const [paramscode, setParamscode] = useContext(ParamsCodeContext);
  const [codeUser, setCodeUser] = useState();
  const [inputerror, setInputerror] = useState("2px solid white");
  const [messageerror, setMessageerror] = useState("");

  const navigate = useNavigate();
  console.log(paramscode.message);
  async function Createuser() {
    try {
      const user = { email: paramscode.destino, senha: paramscode.senha };
      const response = axios.post(
        "https://67312aae7aaf2a9aff10029c.mockapi.io/users",
        user
      );
      console.log("Usuario adicionado", response.data);
      navigate("/");
    } catch (error) {
      console.error(error.name);
    }
  }

  function ConfirmarCode() {
    if (paramscode.destino) {
      if (status == "forgout") {
        if (codeUser !== paramscode.message) {
          setInputerror("2px solid red");
          setMessageerror("Código incorreto");
        } else if (codeUser == paramscode.message) {
          navigate(`/redefinirpass`);
        }
      } else if (status == "createuser") {
        Createuser();
      }
    }
  }

  return (
    <section className={styles.CodeVerification}>
      <div className={styles.EmailInput}>
        <h1>- Código enviado para seu email! -</h1>
        <h2>Digite o código</h2>
        <p>{messageerror}</p>
        <input
          type="text"
          onChange={(e) => setCodeUser(e.target.value)}
          style={{ border: inputerror }}
        />
        <button onClick={() => ConfirmarCode()}>Confirmar</button>
      </div>
    </section>
  );
}

export default PassCodeVerification;
