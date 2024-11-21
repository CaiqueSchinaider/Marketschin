import { createContext, useEffect, useState } from "react";

export const ParamsCodeContext = createContext();

export default function ParamsCodeProvider({ children }) {
  const pegardados = localStorage.getItem("datas");
  const [paramscode, setParamscode] = useState(
    localStorage.getItem(JSON.parse(pegardados))
  );
  useEffect(() => {
    localStorage.setItem("datas", JSON.stringify(paramscode));
  }, [paramscode]);
  return (
    <ParamsCodeContext.Provider value={[paramscode, setParamscode]}>
      {children}
    </ParamsCodeContext.Provider>
  );
}
