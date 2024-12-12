import { useContext } from 'react';
import styles from './Data.module.css';
import { ParameterUtilsContext } from '../../contexts/ParameterUtils';
import Loading from '../Loading';
import { Link } from 'react-router-dom';

function Data() {
  const [parameterUtils] = useContext(ParameterUtilsContext);
  return parameterUtils ? (
    <main className={styles.Data}>
      <h1>Usuario</h1>
      <div className={styles.DataGroup}>
        <section className={styles.LocalUserData}>
          <h2>Dados Pessoais</h2>
          <h3>Informações de Login</h3>
          <p>
            <strong> Email:</strong> {parameterUtils.destino}
          </p>
          <p>
            <strong> Senha:</strong> {parameterUtils.senha}
          </p>
          <Link to="/emailverification">Redefinir senha</Link>
        </section>
        <section className={styles.LocalBankData}>
          <h2>Dados Bancarios</h2>
          <h3>Cartões</h3>
          <Link to="/addcard">
            Adcionar cartão <img src="/pic/addcard.png" alt="pic addcard" />
          </Link>
        </section>
      </div>
    </main>
  ) : (
    <Loading />
  );
}

export default Data;
