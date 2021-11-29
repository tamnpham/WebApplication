import { set } from 'date-fns';
import React, { useState } from 'react';

export const AuthContext = React.createContext({
    token: '',
    firstName: '',
    lastName: '',
    avatar: '',
    isLoggedIn: false,
    login: (token, firstName, lastName, avatar) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const initialFirstName = localStorage.getItem('firstName');
    const initialLastName = localStorage.getItem('lastName');
    const initialAvatar = localStorage.getItem('avatar');

    const [token, setToken] = useState(initialToken);
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [avatar, setAvatar] = useState(initialAvatar);

    const userIsLoggedIn = !!token; // return true or false
     
    //if user have token => enable
    //if user does not have token => disable
    const loginHandler = (token, firstName, lastName, avatar) => {
        setToken(token);
        setFirstName(firstName);
        setLastName(lastName);
        setAvatar(avatar);

        localStorage.setItem('token', token);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('avatar', avatar);
    }

    const logoutHandler = () => {
        setToken(null);
        setFirstName(null);
        setLastName(null);
        setAvatar(null);

        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('avatar');
    }

    const contextValue = {
        token: token,
        firstName: firstName,
        lastName: lastName,
        avatar: avatar,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }
    return (
        <AuthContext.Provider value={contextValue}>
        {props.children}
        </AuthContext.Provider>
    )
}

