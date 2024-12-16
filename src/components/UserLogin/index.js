import { useNavigate } from 'react-router-dom';
import styles from './UserLogin.module.css';
import { useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { ParameterUtilsContext } from '../../contexts/ParameterUtils';

function Logar() {
  const firebaseConfig = initializeApp({
    apiKey: 'AIzaSyDIs9ELd9Fe4C-uP0r_m6H1jZgiKBQ4nb0',
    authDomain: 'marketschin-react.firebaseapp.com',
    projectId: 'marketschin-react',
  });
  const dataBase = getFirestore(firebaseConfig);
  const userCollectionRef = collection(dataBase, 'users');

  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [, setParameterUtils] = useContext(ParameterUtilsContext);
  const [email, setEmail] = useState('');

  // Exibe ou não o erro nos inputs de dados (parametros de style)
  const [statusErrorPassword, setStatusErrorPassword] = useState('hidden');
  const [statusErrorEmail, setStatusErrorEmail] = useState('hidden');

  // Exibe bordas vermelhas nos inputs (parametros de style)
  const [ErrorPassword, setErrorPassword] = useState('2px solid white');
  const [ErrorEmail, setErrorEmail] = useState('2px solid white');

  // Sinais que checam erros (boolean)
  const [haveErrorPassword, setHaveErrorPassword] = useState();
  const [haveErrorEmail, setHaveErrorEmail] = useState();

  // Exibe a informação do error  ("")
  const [infoErrorPassword, setInfoErrorPassword] = useState();
  const [infoErrorEmail, setInfoErrorEmail] = useState();

  // Sinaliza para começar a fazer login (boolean)
  const [signal, setSignal] = useState(false);

  // Verificação de email e senha
  const checkLogin = () => {
    // Se a senha foi digitada
    if (password === '') {
      setHaveErrorPassword(false);
      setInfoErrorPassword('A senha é obrigatoria');
    }
    // Se tudo estiver ok
    else {
      setHaveErrorPassword(true);
    }

    /////////////////////////////////////////////////////////////////////////////

    // Se o email foi digitado
    if (email === '') {
      setHaveErrorEmail(false);
      setInfoErrorEmail('O email é obrigatorio!');

      // Se contém @gmail.com no final do email, e se é maior que 11 caracteres
    } else if (!email.endsWith('@gmail.com') || email.length < 11) {
      setHaveErrorEmail(false);
      setInfoErrorEmail('O email não é valido');

      // Se tudo estiver ok
    } else {
      setHaveErrorEmail(true);
    }

    //signaliza o inicio das mensagens
    setSignal(true);
  };

  useEffect(() => {
    const handleLogin = async () => {
      if (signal) {
        if (!haveErrorPassword) {
          setStatusErrorPassword('visible');
          setErrorPassword('2px solid red');
        } else {
          setStatusErrorPassword('hidden');
          setErrorPassword('none');
        }
        if (!haveErrorEmail) {
          setStatusErrorEmail('visible');
          setErrorEmail('2px solid red');
        } else {
          setStatusErrorEmail('hidden');
          setErrorEmail('none');
        }
        if (haveErrorEmail && haveErrorPassword) {
          const usersData = async () => {
            const data = await getDocs(userCollectionRef);
            const infoData = data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            return infoData;
          };

          const infoData = await usersData();
          const logFindEmail = infoData.find((users) => users.email === email);

          if (logFindEmail && logFindEmail.senha == password) {
            // Se tudo estiver ok
            navigate('/home');
            setParameterUtils({
              nickname: logFindEmail.nickname,
              message: '',
              destino: email,
              senha: password,
            });
          } else if (!logFindEmail) {
            console.log('Email é', logFindEmail);
            // Se não, verifica se existe uma conta com esse email, ou se a senha ta errada
            setInfoErrorEmail('Essa conta não existe!');
            setStatusErrorEmail('visible');
            setErrorEmail('2px solid red');
          } else if (logFindEmail.password !== password) {
            setInfoErrorPassword('Senha incorreta');
            setStatusErrorPassword('visible');
            setErrorPassword('2px solid red');
          }
        }
      }
    };
    handleLogin();
    setSignal(false);
  }, [signal]);

  return (
    <section className={styles.LoginData}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ border: `${ErrorEmail}` }}
        />
        <p
          className={styles.ErrorMessage}
          style={{ visibility: `${statusErrorEmail}` }}
        >
          {infoErrorEmail}
        </p>
      </div>

      <div>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ border: `${ErrorPassword}` }}
        />
        <p
          className={styles.ErrorMessage}
          style={{ visibility: `${statusErrorPassword}` }}
        >
          {infoErrorPassword}
        </p>
      </div>

      <nav>
        <button style={{ cursor: 'pointer' }} onClick={() => checkLogin()}>
          Entrar
        </button>
      </nav>
    </section>
  );
}

export default Logar;
