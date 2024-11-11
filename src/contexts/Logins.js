import { createContext, useState } from "react";

// Crio um contexto LoginsContext
export const LoginsContext = createContext();

// Muda o nome dele para "LoginsLog" so na parte visual (opcional)
LoginsContext.displayName = "LoginsLog";

//Cria uma função qyue vai prover um state, que se chama (login) e o (setLogin) dele para que possa alterar-lo
export default function LoginsProvider({ children }) {
  const [login, setLogin] = useState(false);

  return (
    <LoginsContext.Provider value={[login, setLogin]}>
      {children}
    </LoginsContext.Provider>
  );
}
