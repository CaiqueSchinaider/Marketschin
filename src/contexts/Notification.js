import { Children, createContext, useEffect, useState } from 'react';

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState();
  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {children}
    </NotificationContext.Provider>
  );
}
