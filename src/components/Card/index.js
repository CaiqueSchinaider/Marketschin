import { Link } from 'react-router-dom';
import Container from '../Container';
import styles from './Card.module.css';
import { useContext, useEffect, useState } from 'react';
import { listProductsContext } from '../../contexts/MockProdutos';
import { toast, ToastContainer } from 'react-toastify';
import { NotificationContext } from '../../contexts/Notification';

function Card({ item }) {
  const [listProducts] = useContext(listProductsContext);
  const [, setNotification] = useContext(NotificationContext);
  function addCart(id) {
    const list = JSON.parse(localStorage.getItem('listcart'));
    console.log('primeiro passo');
    console.log(list);
    if (list) {
      const itemCheck = list.find((product) => product.id == id);
      console.log('segundo passo');
      if (itemCheck) {
        // Ja possui
        console.log('terceiro passo');
      } else {
        const productpurchased = listProducts.find(
          (product) => product.id == id,
        );
        console.log('quarto passo');
        if (productpurchased) {
          console.log('quinto passo');
          const updatelist = [...list, productpurchased];
          if (updatelist) {
            console.log('sexto passo');
            localStorage.setItem('listcart', JSON.stringify(updatelist));
            setNotification('adicionado');
          }
        }
      }
    } else {
      const productpurchased = listProducts.find((product) => product.id == id);
      if (productpurchased) {
        console.log('quinto passo');
        const createlist = [
          {
            productpurchased,
          },
        ];
        if (createlist) {
          console.log('sexto passo');
          localStorage.setItem('listcart', JSON.stringify(createlist));
          setNotification('adicionado');
        }
      }
    }
  }
  const valueFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(item.valor);
  return (
    <section className={styles.Card}>
      <Link
        className={styles.LinksCard}
        to={`/produto/${item.id}`}
        style={{ textDecoration: 'none' }}
      >
        <img src={item.thumb} alt="Produto imagem"></img>
      </Link>
      <div className={styles.InfoCard}>
        <p> {item.name}</p>
        <section>
          <h2>{valueFormatted}</h2>
          <button onClick={() => addCart(item.id)}>
            {' '}
            <img src="/pic/cart.png"></img>
          </button>
        </section>
      </div>
    </section>
  );
}
export default Card;
