import { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import styles from './User.module.css';
import Data from '../../components/Data';
import axios from 'axios';
import { ParameterUtilsContext } from '../../contexts/ParameterUtils';
import { Link } from 'react-router-dom';

function User({ children }) {
  const [parameterUtils] = useContext(ParameterUtilsContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (parameterUtils) {
          const response = await axios.get(
            'https://67312aae7aaf2a9aff10029c.mockapi.io/getUser',
          );
          console.log('usuario encontrado', response.data);

          const userdata = await response.data.find(
            (datas) => datas.email === parameterUtils.destino,
          );

          if (userdata) {
            setUser(userdata.nickname);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Usuario não encontrado', error);
        setUser(null);
      }
    };
    getUser();
  }, [parameterUtils]);

  return (
    <div className={styles.User}>
      <Header />
      <div className={styles.Agrupamento}>
        {/* Info do Usuario  */}
        <aside className={styles.Infos}>
          <h1> Suas Informações</h1>
          <p>{user}</p>
        </aside>

        {/* Navegation  */}
        <nav className={styles.Navigation}>
          <button>
            <img src="/pic/market.png" alt="Imagem de Compras" /> <p>Compras</p>
          </button>
          <button>
            <img src="/pic/Sell.png" alt="Imagem de Vendas" /> <p>Vendas</p>
          </button>
          <button>
            <img src="/pic/Person Security.png" alt="Imagem de Conta" />{' '}
            <p>Conta</p>
          </button>
          <button>
            <img src="/pic/Settings.png" alt="Imagem de Configuração" />{' '}
            <p>Configuração</p>
          </button>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button>
              <img src="/pic/back.png" alt="Imagem de Sair" /> <p>Sair</p>
            </button>
          </Link>
        </nav>
      </div>

      {/* Slides de produtos disponiveis  */}
      <section className={styles.Caroseul}>
        <Data />
        {/* <Carroseul /> */}
      </section>
    </div>
  );
}
export default User;
