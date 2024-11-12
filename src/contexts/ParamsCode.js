import { createContext, useState } from "react";

export const ParamsCodeContext = createContext();

export default function ParamsCodeProvider({ children }) {
  const [paramscode, setParamscode] = useState([
    {
      message: "",
      destino: "",
      senha: "",
    },
  ]);

  return (
    <ParamsCodeContext.Provider value={[paramscode, setParamscode]}>
      {children}
    </ParamsCodeContext.Provider>
  );
}