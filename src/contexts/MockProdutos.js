import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';

export const listProductsContext = createContext();

export default function ListProductsProvider({ children }) {
  const firebaseConfig = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  });
  const dataBase = getFirestore(firebaseConfig);
  const userCollectionRef = collection(dataBase, 'product'); // Products é um mock hospedado no Firestore (firebase)

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
