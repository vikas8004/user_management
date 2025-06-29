import { createContext, useContext, useState } from 'react';

const UserContextApi = createContext();

export const useUser = () => useContext(UserContextApi);

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);

  return (
    <UserContextApi.Provider value={{ users, setUsers, setLoggedInUser, loggedInUser }}>
      {children}
    </UserContextApi.Provider>
  );
};
