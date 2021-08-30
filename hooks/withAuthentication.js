import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { SET_AUTH_USER } from '../constants/actionTypes'
import FirebaseContext from '../components/firebase/context';

const saveToLocalStorage = (authUser) => {
  localStorage.setItem('authUser', JSON.stringify(authUser));
};

const withAuthentication = (Component) => {
  const NewComponent = (props) => {
    const firebase = useContext(FirebaseContext);
    const dispatch = useDispatch();

    const next = (authUser) => {
      saveToLocalStorage(authUser);
      dispatch({ type: SET_AUTH_USER, payload: authUser });
    };
    const fallback = () => {
      localStorage.removeItem('authUser');
      dispatch({ type: SET_AUTH_USER, payload: null });
    };
    useEffect(() => {
      const authUser = JSON.parse(localStorage.getItem('authUser'));
      console.log("auth user:: ", authUser)
      dispatch({ type: SET_AUTH_USER, payload: authUser });
      firebase.onAuthChangeListener(next, fallback);
    }, []);

    return <Component {...props} />;
  };

  return NewComponent;
};

export default withAuthentication;
