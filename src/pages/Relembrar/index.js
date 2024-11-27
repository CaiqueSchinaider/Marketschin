import { useEffect, useState } from "react";
import styles from "./Relembrar.module.css";
import emailjs from "emailjs-com";
import axios from "axios";
import { Link } from "react-router-dom";

function Relembrar() {
  const [sendemail, setSendemail] = useState({});
  const [email, setEmail] = useState();
  const [senhaRed, setSenhaRed] = useState();
  const [mockdados, setMockdados] = useState();
  const [senhanew, setSenhanew] = useState();
  const [sinal, setSinal] = useState("");
  const [codes, setCodes] = useState();
  const [sinalEmail, setSinalEmail] = useState();
  const [messagecode, setMessagecode] = useState();
  const [newData, setNewData] = useState();
  const [userID, setUserID] = useState();

  console.log(sinal);

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
  }, [sinal, sinalEmail]);
  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////
  // Definir email
  function Verificar() {
    const codeAleatorio = Math.floor(Math.random() * 1000);
    const codeFormatado = codeAleatorio.toString().padStart(3, "0");
    console.log(codeFormatado);
    setMessagecode(codeFormatado); // É usado para identificar se os códigos batem

    ///////
    // Parametros para o template do email
    if (codeFormatado) {
      setSendemail({
        destino: email,
        message: codeFormatado,
      });
      ///////

      setSinalEmail(true); // Sinaliza o envio do email

      setSinal("digitar code"); // Sinaliza para troca de inputs para digitar o código
    }
  }
  ////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////
  // Obtém a lista de objetos no array com os usuarios
  async function identificarID() {
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
  ////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////
  // Prepara a redefinição de senha
  async function Confirmar() {
    if (messagecode == codes) {
      // Se o código digitado for correto

      setSinal("redefinir"); // Sinaliza para exibit inputs para redefinir

      const dados = await identificarID(); // Chama a função para obter os dados do array de users

      setMockdados(dados.find((user) => user.name == email)); // Pega o usuario correspondente ao email do user
      setSenhanew({ senha: senhaRed }); // Prepara a senha que o usuario deseja redefinir
    }
  }

  //////////////////////////////////////////////////
  // Vai iniciar o patch com a nova senha
  async function AtualizarUser(userID, newData) {
    console.log("opa", mockdados.id);
    // "UserID" é o Mockdados.id, "newData" é o indice "senha" atualizado]

    try {
      const response = await axios.patch(
        `https://67312aae7aaf2a9aff10029c.mockapi.io/users/2`,
        newData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Usuario atualizado", response.data);
      return response.data;
    } catch (error) {
      console.error("Error ao atualizar o usuario", error.message);
    }
  }
  //////////////////////////////////////////////////////
  return (
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
      sinal == "redefinir" ? (
        <main className={styles.VerPassword}>
          <label>
            Crie uma nova senha
            <input type="text" onChange={(e) => setSenhaRed(e.target.value)} />
          </label>
          <button onClick={() => AtualizarUser(mockdados.id, senhanew)}>
            Confirmar
          </button>
        </main>
      ) : (
        /////////////////////////////////////////////////////////////

        <></>
      )}
    </section>
  );
}

export default Relembrar;
