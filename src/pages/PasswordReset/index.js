import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './PasswordReset.module.css';
import { useContext, useState } from 'react';

import { initializeApp } from 'firebase/app';
import {
  collection,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { ParameterUtilsContext } from '../../contexts/ParameterUtils';
import { SegurityPasswordContext } from '../../contexts/SegurityPassword';

function Redefinir() {
  const firebaseConfig = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  });
  const dataBase = getFirestore(firebaseConfig);
  const userCollectionRef = collection(dataBase, 'users');

  const [parameterUtils] = useContext(ParameterUtilsContext);
  const navigate = useNavigate();
  const [checkSegurity] = useContext(SegurityPasswordContext);
  const { prmsemail } = useParams();
  const [newPassword, setnewPassword] = useState('');
  const [afterCheck, setAfterCheck] = useState('');
  const [infoErrorPassword, setInfoErrorPassword] = useState('');
  const [errorPassword, ErrorPassword] = useState('2px solid white');
  const [titleDinamic, setTitleDinamic] = useState('Crie uma nova senha');
  const [buttonDisplay, setButtonDisplay] = useState('none');

  BlockContinuation();

  function BlockContinuation() {
    if (!checkSegurity) {
      setTimeout(() => {
        navigate('/emailverification');
      }, 3000);
    } else {
    }
  }

  console.log('Esse é o email', prmsemail);
  console.log('Esse é o meu parametros code', parameterUtils);

  async function PasswordReset() {
    if (parameterUtils) {
      if (newPassword.length < 8) {
        setInfoErrorPassword('A senha deve conter no mínimo 8 caracteres');
        ErrorPassword('2px solid red');
      } else if (!/[A-Z]/.test(newPassword)) {
        setInfoErrorPassword(
          'A senha deve conter no mínimo uma letra maiuscula',
        );
        ErrorPassword('2px solid red');
      } else if (!/[a-z]/.test(newPassword)) {
        setInfoErrorPassword(
          'A senha deve conter no mínimo uma letra minuscula',
        );
        ErrorPassword('2px solid red');
      } else if (!/[0-9]/.test(newPassword)) {
        setInfoErrorPassword('A senha deve conter no mínimo um número');
        ErrorPassword('2px solid red');
      } else {
        const dados = await identifyID();

        const user = await dados.find(
          (user) => user.email === parameterUtils.destino,
        );
        console.log(prmsemail);
        console.log(user);
        const updatePassword = { senha: newPassword };

        newPasswordPost(user.id, updatePassword);
      }
    }
  }

  async function identifyID() {
    // Funçao que retorna dados do mock users
    try {
      const dataUser = await getDocs(userCollectionRef);
      const infoData = dataUser.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log('Dados pegos com sucesso');
      return infoData; //Retornando a lista para onde a função foi chamada
    } catch (error) {
      console.error('Error ao pegar dados', error.name);
    }
  }

  async function newPasswordPost(userID, senha) {
    try {
      const userRef = doc(dataBase, 'users', userID);
      updateDoc(userRef, senha);
      setAfterCheck('none');
      setTitleDinamic('Senha Redefinida!');
      setButtonDisplay('flex');
      setInfoErrorPassword('');
    } catch (error) {
      console.error('Error ao atualizar o usuario', error.message);
    }
  }

  return checkSegurity ? (
    <section className={styles.PasswordReset}>
      <div className={styles.InsertPassword}>
        <h2>{titleDinamic}</h2>
        <p style={{ display: infoErrorPassword }}>{infoErrorPassword}</p>
        <input
          type="text"
          onChange={(e) => setnewPassword(e.target.value)}
          style={{ display: afterCheck, border: errorPassword }}
        />
        <button onClick={() => PasswordReset()} style={{ display: afterCheck }}>
          Redefinir
        </button>
        <Link to="/" style={{ display: buttonDisplay }}>
          Menu principal
        </Link>
      </div>
    </section>
  ) : (
    <>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          color: 'red',
          width: '100vw',
          fontSize: 'clamp(14px, 3vw, 3vw)',
          textAlign: 'center',
        }}
      >
        {' '}
        Você não possui acesso a essa pagina
      </h1>
      <p
        style={{
          justifyContent: 'center',
          color: 'white',
          width: '100vw',
          fontSize: 'clamp(14px, 3vw, 3vw)',
          textAlign: 'center',
        }}
      >
        Redirecionando para <strong>Verificação de email</strong>...
      </p>
    </>
  );
}

export default Redefinir;
