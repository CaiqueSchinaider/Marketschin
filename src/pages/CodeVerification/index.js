import { useContext, useEffect, useState } from 'react';
import styles from './CodeVerification.module.css';

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ParameterUtilsContext } from '../../contexts/ParameterUtils';
import { SegurityPasswordContext } from '../../contexts/SegurityPassword';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';

function PassCodeVerification() {
  const firebaseConfig = initializeApp({
    apiKey: 'AIzaSyDIs9ELd9Fe4C-uP0r_m6H1jZgiKBQ4nb0',
    authDomain: 'marketschin-react.firebaseapp.com',
    projectId: 'marketschin-react',
  });
  const dataBase = getFirestore(firebaseConfig);
  const userCollectionRef = collection(dataBase, 'users');
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
      addDoc(userCollectionRef, {
        nickname: parameterUtils.nickname,
        email: parameterUtils.destino,
        senha: parameterUtils.senha,
      });
      console.log('Usuario adicionado');
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
    <section className={styles.CodeCheck}>
      <div className={styles.InsertCodeBox}>
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
