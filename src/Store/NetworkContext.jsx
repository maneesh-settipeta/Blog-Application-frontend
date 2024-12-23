// import React, { createContext, useContext, useEffect, useState } from 'react';

// const NetworkContext = createContext();

// export const useNetwork = () => {
//   return useContext(NetworkContext);
// };

// export const NetworkProvider = ({ children }) => {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
// console.log(navigator.onLine);

//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);
//     console.log(isOnline);
    
//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, []);

//   return (
//     <NetworkContext.Provider value={true}>
//       {children}
//     </NetworkContext.Provider>
//   );
// };
