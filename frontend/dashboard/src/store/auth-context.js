import { set } from 'date-fns';
import React, { useState } from 'react';

export const AuthContext = React.createContext({
    token: '',
    firstName: '',
    lastName: '',
    avatar: '',
    role: '',
    isLoggedIn: false,
    login: (token, firstName, lastName, avatar, role) => {},
    logout: () => {},
    update: (firstName, lastName, avatar) => {},
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const initialFirstName = localStorage.getItem('firstName');
    const initialLastName = localStorage.getItem('lastName');
    const initialAvatar = localStorage.getItem('avatar');
    const initialRole = localStorage.getItem('role');

    const [token, setToken] = useState(initialToken);
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [avatar, setAvatar] = useState(initialAvatar);
    const [role, setRole] = useState(initialRole);

    const userIsLoggedIn = !!token; // return true or false
     
    //if user have token => enable
    //if user does not have token => disable
    const loginHandler = (token, firstName, lastName, avatar, role) => {
        setToken(token);
        setFirstName(firstName);
        setLastName(lastName);
        setAvatar(avatar);
        setRole(role);

        localStorage.setItem('token', token);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('avatar', avatar);
        localStorage.setItem('role', role);
    }

    const logoutHandler = () => {
        setToken(null);
        setFirstName(null);
        setLastName(null);
        setAvatar(null);
        setRole(null);

        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('avatar');
        localStorage.removeItem('role');
    }

    const updateHandler = (firstName, lastName, avatar) => {
        setFirstName(firstName);
        setLastName(lastName);
        setAvatar(avatar);

        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('avatar', avatar);
    }

    const contextValue = {
        token: token,
        firstName: firstName,
        lastName: lastName,
        avatar: avatar,
        role: role,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        update: updateHandler
    }
    return (
        <AuthContext.Provider value={contextValue}>
        {props.children}
        </AuthContext.Provider>
    )
}

