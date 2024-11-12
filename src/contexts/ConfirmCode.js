import { createContext, useState } from "react";

export const ConfirmCodeContext = createContext();

export default function ConfimCodeProvider({ children }) {
  const [code, setCode] = useState(false);

  return (
    <ConfirmCodeContext.Provider value={[code, setCode]}>
      {children}
    </ConfirmCodeContext.Provider>
  );
}
