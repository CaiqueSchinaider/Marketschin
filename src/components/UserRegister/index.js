import { useNavigate } from 'react-router-dom';
import styles from './UserRegister.module.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ParameterUtilsContext } from '../../contexts/ParameterUtils';
function Registrar() {
  const [, setParameterUtils] = useContext(ParameterUtilsContext);
  const navigate = useNavigate();
  // States que recebem os valores dos inputs
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfimation, setPasswordConfimation] = useState('');
  ////

  // States que recebem valores de styles para mostra mensagem de error
  const [statusErrorPassword, setStatusErrorPassword] = useState('hidden');
  const [statusErrorEmail, setStatusErrorEmail] = useState('hidden');
  const [statusErrorPasswordCheck, setStatusErrorPasswordCheck] =
    useState('hidden');
  ////

  // States que recebem valores de styles para os inputs em caso de erro
  const [ErrorPassword, setErrorPassword] = useState('2px solid white');
  const [ErrorEmail, setErrorEmail] = useState('2px solid white');
  const [ErrorPasswordCheck, setErrorPasswordCheck] =
    useState('2px solid white');
  ////

  // States que recebem valores se tem erro (boleanos)
  const [haveErrorPassword, setHaveErrorPassword] = useState();
  const [haveErrorEmail, setHaveErrorEmail] = useState();
  const [haveErrorPasswordCheck, setHaveErrorPasswordCheck] = useState();
  ////

  // States que determina a mensagem que sera exibida de erro
  const [infoErrorEmail, setInfoErrorEmail] = useState();
  const [infoErrorPassword, setInfoErrorPassword] = useState();
  const [infoErrorPasswordCheck, setInfoErrorPasswordCheck] = useState();
  /////

  // State que serve para enviar sinal para o useEffect
  const [signal, setSignal] = useState(false);
  /////

  // Verificação de email e senhas

  const checkUser = () => {
    // Se a senha foi digitada
    if (password === '') {
      setHaveErrorPassword(false);
      setInfoErrorPassword('A senha é obrigatoria');

      // Se a senha tem no minimo 8 caracteres
    } else if (password.length < 8) {
      setHaveErrorPassword(false);
      setInfoErrorPassword('A senha deve conter no mínimo 8 caracteres');

      // Se a senha tem no minimo uma letra maisucula
    } else if (!/[A-Z]/.test(password)) {
      setHaveErrorPassword(false);
      setInfoErrorPassword('A senha deve conter letra maiusculas');

      // Se a senha tem no minimo uma letra minuscula
    } else if (!/[a-z]/.test(password)) {
      setHaveErrorPassword(false);
      setInfoErrorPassword('A senha deve conter letra minusculas');

      // Se a senha tem no minimo um número
    } else if (!/[0-9]/.test(password)) {
      setHaveErrorPassword(false);
      setInfoErrorPassword('A senha deve conter números');
      // Se tudo estiver ok
    } else {
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
    } else {
      // Se tudo estiver ok
      setHaveErrorEmail(true);
    }

    if (passwordConfimation === '') {
      setHaveErrorPasswordCheck(false);
      setInfoErrorPasswordCheck('Confime a senha!');
    } else if (passwordConfimation !== password) {
      setHaveErrorPasswordCheck(false);
      setInfoErrorPasswordCheck('As senhas não coincidem!');
    } else {
      setHaveErrorPasswordCheck(true);
    }
    //Sinaliza o inicio das mensagens
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
      ////////
      if (!haveErrorEmail) {
        setStatusErrorEmail('visible');
        setErrorEmail('2px solid red');
      } else {
        setStatusErrorEmail('hidden');
        setErrorEmail('none');
      }
      ////////
      if (!haveErrorPasswordCheck) {
        setStatusErrorPasswordCheck('visible');
        setErrorPasswordCheck('2px solid red');
      } else {
        setStatusErrorPasswordCheck('hidden');
        setErrorPasswordCheck('none');
      }
    }
    if (haveErrorEmail && haveErrorPassword && haveErrorPasswordCheck) {
      userRegister();
    }
    setSignal(false);
  }, [signal]);

  async function userRegister() {
    try {
      const Response = await axios.get(
        'https://67312aae7aaf2a9aff10029c.mockapi.io/users',
      );
      const dados_user = Response.data;
      const localizar_usuario = await dados_user.some(
        (log_users) => log_users.email === email,
      );
      if (localizar_usuario) {
        setInfoErrorEmail('Essa conta já existe!');
        setStatusErrorEmail('visible');
        setErrorEmail('2px solid red');
      } else {
        const codeFormatted = converte();
        const passwordFormatted = String(password);
        setParameterUtils({
          nickname: nickname,
          message: codeFormatted,
          destino: email,
          senha: passwordFormatted,
        });

        navigate(`/codeverification/createuser`);
      }
    } catch (erro) {
      console.error('Aconteceu algum erro', erro.message);
    }
  }

  function converte() {
    const createCode = Math.floor(Math.random() * 1000);
    return createCode.toString().padStart(3, '0');
  }

  return (
    <form className={styles.RegisterForm}>
      <div>
        <label htmlFor="nickname">Nickname</label>
        <input
          type="text"
          id="text"
          onChange={(e) => setNickname(e.target.value)}
          required
          style={{ border: '2px solid white' }}
        />
      </div>
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

      <div id="passworddiv">
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
      <div>
        <label for="confirmpassword">Confirme sua senha</label>
        <input
          type="password"
          id="confirmpassword"
          onChange={(e) => setPasswordConfimation(e.target.value)}
          style={{ border: `${ErrorPasswordCheck}` }}
        />
        <p
          className={styles.ErrorMessage}
          style={{ visibility: `${statusErrorPasswordCheck}` }}
        >
          {infoErrorPasswordCheck}
        </p>
      </div>
      <nav>
        <button
          type="button"
          style={{ cursor: 'pointer' }}
          onClick={() => checkUser()}
        >
          Criar
        </button>
      </nav>
    </form>
  );
}

export default Registrar;
