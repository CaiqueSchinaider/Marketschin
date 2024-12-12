import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const listProductsContext = createContext();

export default function ListProductsProvider({ children }) {
  const [listProducts, setListProducts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://67312aae7aaf2a9aff10029c.mockapi.io/Products',
        );
        console.log('Dados do mock pegos', response.data);

        setListProducts(response.data);
      } catch (error) {
        console.error('Dados não encontrados', error.name);
      }
    };
    fetchData();
  }, []);

  return (
    <listProductsContext.Provider value={[listProducts, setListProducts]}>
      {children}
    </listProductsContext.Provider>
  );
}
