import { createContext, useState } from 'react';

// Crio um contexto LoginsContext
export const LoginsContext = createContext();

//Cria uma função que vai prover um state, que se chama (login) e o (setLogin) dele para que possa alterar-lo
export default function LoginsProvider({ children }) {
  const [login, setLogin] = useState(false);

  return (
    <LoginsContext.Provider value={[login, setLogin]}>
      {children}
    </LoginsContext.Provider>
  );
}
