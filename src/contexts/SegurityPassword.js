import { createContext, useState } from 'react';

export const SegurityPasswordContext = createContext();

export default function SegurityPasswordProvider({ children }) {
  const [checkSegurity, setCheckSegurity] = useState();
  return (
    <SegurityPasswordContext.Provider value={[checkSegurity, setCheckSegurity]}>
      {children}
    </SegurityPasswordContext.Provider>
  );
}
