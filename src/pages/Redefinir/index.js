import { Link, useParams } from "react-router-dom";
import styles from "./Redefinir.module.css";
import { useState } from "react";

import axios from "axios";

function Redefinir() {
  const { prmsemail } = useParams();
  const [newPass, setNewPass] = useState("");
  const [display, setDisplay] = useState("");
  const [pdisplay, setPdisplay] = useState("");
  const [inputerror, setInputerror] = useState("2px solid white");
  const [h2display, setH2display] = useState("Crie uma nova senha");
  const [backdisplay, setBackdisplay] = useState("none");

  async function RedefinirPass() {
    if (newPass.length < 8) {
      setPdisplay("A senha deve conter no mínimo 8 caracteres");
      setInputerror("2px solid red");
    } else if (!/[A-Z]/.test(newPass)) {
      setPdisplay("A senha deve conter no mínimo uma letra maiuscula");
      setInputerror("2px solid red");
    } else if (!/[a-z]/.test(newPass)) {
      setPdisplay("A senha deve conter no mínimo uma letra minuscula");
      setInputerror("2px solid red");
    } else if (!/[0-9]/.test(newPass)) {
      setPdisplay("A senha deve conter no mínimo um número");
      setInputerror("2px solid red");
    } else {
      const dados = await identificarID();
      const user = await dados.find((user) => user.name == prmsemail);
      console.log(prmsemail);
      console.log(user);
      const updatepass = { senha: newPass };

      AtualizarUser(user.id, updatepass);
    }
  }

  async function identificarID() {
    // Funçao que retorna dados do mock users
    try {
      const response = await axios.get(
        "https://67312aae7aaf2a9aff10029c.mockapi.io/users"
      );
      console.log("Dados pegos com sucesso", response.data);
      return response.data; //Retornando a lista para onde a função foi chamada
    } catch (error) {
      console.error("Error ao pegar dados", error.name);
    }
  }

  async function AtualizarUser(userID, newData) {
    try {
      const response = await axios.patch(
        `https://67312aae7aaf2a9aff10029c.mockapi.io/users/${userID}`,
        newData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        "Usuario atualizado",
        response.data,
        setDisplay("none"),
        setH2display("Senha Redefinida!"),
        setBackdisplay("flex"),
        setPdisplay("")
      );
      return response.data;
    } catch (error) {
      console.error("Error ao atualizar o usuario", error.message);
    }
  }

  return (
    <section className={styles.Redefinir}>
      <div className={styles.EmailInput}>
        <h2>{h2display}</h2>
        <p style={{ display: pdisplay }}>{pdisplay}</p>
        <input
          type="text"
          onChange={(e) => setNewPass(e.target.value)}
          style={{ display: display, border: inputerror }}
        />
        <button onClick={() => RedefinirPass()} style={{ display: display }}>
          Redefinir
        </button>
        <Link to="/" style={{ display: backdisplay }}>
          Menu principal
        </Link>
      </div>
    </section>
  );
}

export default Redefinir;
