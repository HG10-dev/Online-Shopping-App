
import UserContext from './UserContext';
import { useState } from 'react';

const UserProvider = ({children}) =>{

    const [state, setState] = useState({});
    <UserContext.Provider value={{state, setState}}>
        {children}
    </UserContext.Provider>
}

export default UserProvider;