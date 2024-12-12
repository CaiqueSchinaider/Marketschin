import { createContext, useEffect, useState } from 'react';

export const ParameterUtilsContext = createContext();

export default function ParameterUtilsProvider({ children }) {
  const getData = localStorage.getItem('data');
  const [parameterUtils, setParameterUtils] = useState(
    getData ? JSON.parse(getData) : null,
  );
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(parameterUtils));
  }, [parameterUtils]);
  return (
    <ParameterUtilsContext.Provider value={[parameterUtils, setParameterUtils]}>
      {children}
    </ParameterUtilsContext.Provider>
  );
}
