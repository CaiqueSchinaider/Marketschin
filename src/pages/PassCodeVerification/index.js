import { useContext, useEffect, useState } from 'react';
import styles from './PassCodeVerification.module.css';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ParameterUtilsContext } from '../../contexts/ParameterUtils';
import { SegurityPasswordContext } from '../../contexts/SegurityPassword';

function PassCodeVerification() {
  const { status } = useParams();
  const [, setCheckSegurity] = useContext(SegurityPasswordContext);
  const [parameterUtils] = useContext(ParameterUtilsContext);
  const [codeUser, setCodeUser] = useState();
  const [inputError, setInputError] = useState('2px solid white');
  const [infoError, setInfoError] = useState('');

  const navigate = useNavigate();
  console.log(parameterUtils.message);
  async function createUser() {
    try {
      const userData = {
        nickname: parameterUtils.nickname,
        email: parameterUtils.destino,
        senha: parameterUtils.senha,
      };
      const response = axios.post(
        'https://67312aae7aaf2a9aff10029c.mockapi.io/users',
        userData,
      );
      console.log('Usuario adicionado', response.data);
      navigate('/');
    } catch (error) {
      console.error(error.name);
    }
  }

  function checkCode() {
    if (parameterUtils.destino) {
      if (status === 'forgout') {
        if (codeUser !== parameterUtils.message) {
          setInputError('2px solid red');
          setInfoError('Código incorreto');
        } else if (codeUser === parameterUtils.message) {
          navigate(`/redefinirpass`);
          setCheckSegurity(true);
        }
      } else if (status === 'createuser') {
        createUser();
      }
    }
  }

  return (
    <section className={styles.CodeVerification}>
      <div className={styles.EmailInput}>
        <h1>- Código enviado para seu email! -</h1>
        <h2>Digite o código</h2>
        <p>{infoError}</p>
        <input
          type="text"
          onChange={(e) => setCodeUser(e.target.value)}
          style={{ border: inputError }}
        />
        <button onClick={() => checkCode()}>Confirmar</button>
      </div>
    </section>
  );
}

export default PassCodeVerification;
