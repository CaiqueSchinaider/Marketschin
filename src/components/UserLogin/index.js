import { useNavigate } from 'react-router-dom';
import styles from './UserLogin.module.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ParameterUtilsContext } from '../../contexts/ParameterUtils';

function Logar() {
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
        axios
          .get('https://67312aae7aaf2a9aff10029c.mockapi.io/users')
          .then((response) => {
            const infoData = response.data;
            const checkUser = infoData.some(
              (usersdata) =>
                usersdata.email === email &&
                usersdata.senha === String(password),
            );

            const logFindEmail = infoData.some(
              (users) => users.email === email,
            );
            const logFindPassword = infoData.some(
              (users) => users.password === password,
            );

            if (checkUser) {
              // Se tudo estiver ok
              navigate('/home');
              setParameterUtils({
                message: '',
                destino: email,
                senha: password,
              });
            } else if (!logFindEmail) {
              // Se não, verifica se existe uma conta com esse email, ou se a senha ta errada
              setInfoErrorEmail('Essa conta não existe!');
              setStatusErrorEmail('visible');
              setErrorEmail('2px solid red');
            } else if (!logFindPassword) {
              setInfoErrorPassword('Senha incorreta');
              setStatusErrorPassword('visible');
              setErrorPassword('2px solid red');
            }
          });
      }
    }
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
