import { useContext, useEffect, useState } from 'react';
import Logar from '../../components/Logar';
import styles from './Login.module.css';
import Registrar from '../../components/Registrar';
import Loading from '../../components/Loading';

import { LoginsContext } from '../../contexts/SignalLogins';
import { Link } from 'react-router-dom';
import { ParameterUtilsContext } from '../../contexts/ParameterUtils';

function Login() {
  const [, setParameterUtils] = useContext(ParameterUtilsContext);
  // Meu useContext, serve para quando o usuario registrar, mande sinal para ir para login
  const [login] = useContext(LoginsContext);

  // Serve como sinal para identificar se o usuario quer ir para qual pagina de register (login ou Registrar)
  const [register, setRegister] = useState('signalLogin');

  // Usado para saber quando load deve ser chamado
  const [load, setLoad] = useState(true);

  /////////////////////////////////////////////////////////////

  useEffect(() => {
    setTimeout(function () {
      setLoad(false);
      setParameterUtils({});
    }, 700);
  }, [register]);

  /////////////////////////////////////////////////////////////

  return load ? (
    <Loading />
  ) : (
    <section className={styles.Login}>
      <section className={styles.Pai}>
        <header>
          <h1> Market Schin</h1>
        </header>
        {/* Variação de login e register */}
        {register === 'signalLogin' || login ? (
          <Logar />
        ) : register === 'signalRegister' ? (
          <Registrar />
        ) : (
          <> </>
        )}

        <aside>
          <Link to="/emailverification/" style={{ textDecoration: 'none' }}>
            <p>Esqueci a senha</p>
          </Link>
          {register === 'signalLogin' ? (
            <p onClick={() => setRegister('signalRegister')}>Criar conta</p>
          ) : register === 'signalRegister' ? (
            <p onClick={() => setRegister('signalLogin')}>Ja tenho conta</p>
          ) : null}
        </aside>
      </section>
    </section>
  );
}
export default Login;
