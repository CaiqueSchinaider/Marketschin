import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './SendEmailVerification.module.css';
import { useContext, useEffect, useState } from 'react';
import { ParameterUtilsContext } from '../../contexts/ParameterUtils';
import emailjs from 'emailjs-com';
import axios from 'axios';

function SendEmailVerification() {
  const navigate = useNavigate('');
  const [signalEmail, setSignalEmail] = useState();
  const [templateEmail, setTemplateEmail] = useState();
  const [, setParameterUtils] = useContext(ParameterUtilsContext);
  const [email, setEmail] = useState();
  const [code, setCode] = useState();
  const [inputError, setInputError] = useState('2px solid white');
  const [infoError, setInfoError] = useState('');

  // 1° Passo - Definindo parametros de Email
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Definindo parametros de email
  async function getUsers() {
    try {
      const response = await axios.get(
        'https://67312aae7aaf2a9aff10029c.mockapi.io/users',
      );
      console.log('Dados Users pego', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao pegar dados', error.name);
    }
  }

  async function checkUsers() {
    const listUsers = await getUsers();
    const user = await listUsers.find((users) => users.email === email);
    if (user) {
      sendEmail();
    } else {
      setInputError('2px solid red');
      setInfoError('- Não existe usuario com esse email -');
    }
  }
  function sendEmail() {
    const getCode = Math.floor(Math.random() * 1000);
    const formattedCode = getCode.toString().padStart(3, '0');
    console.log(formattedCode);

    if (formattedCode) {
      setTemplateEmail({
        destino: email,
        message: formattedCode,
      });
      setCode(formattedCode);
      setSignalEmail(true);
    }
  }
  // Definiu o Email
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // 2° Passo - Enviando Email
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (signalEmail) {
      emailjs
        .send(
          'service_4fgdqkh',
          'template_p7dxe3r',
          templateEmail,
          'EkUYr-ANKIPXaINm6',
        )
        .then(
          console.log(
            'Email enviado!',

            setParameterUtils({ message: code, destino: email }),
            navigate(`/codeverification/forgout`),
          ),
        )
        .catch((error) => console.error('Email não enviado', error.name));
    }
  }, [signalEmail]);

  // Enviou email, além de definir o Usuario
  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <section className={styles.SendEmailVerification}>
      <div className={styles.InsertEmail}>
        <h2>Digite seu Email</h2>
        <p>{infoError}</p>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          style={{ border: inputError }}
        />

        <button onClick={() => checkUsers()}>Enviar</button>
      </div>
    </section>
  );
}

export default SendEmailVerification;
