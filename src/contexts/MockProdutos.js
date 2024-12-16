import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';

export const listProductsContext = createContext();

export default function ListProductsProvider({ children }) {
  const firebaseConfig = initializeApp({
    apiKey: 'AIzaSyDIs9ELd9Fe4C-uP0r_m6H1jZgiKBQ4nb0',
    authDomain: 'marketschin-react.firebaseapp.com',
    projectId: 'marketschin-react',
  });
  const dataBase = getFirestore(firebaseConfig);
  const userCollectionRef = collection(dataBase, 'products');

  const [listProducts, setListProducts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getDocs(userCollectionRef);
        const infoData = userData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log('Dados do mock pegos', infoData);

        setListProducts(infoData);
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
