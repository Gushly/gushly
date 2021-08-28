import React, { useState, useContext } from 'react';
import { withRouter } from 'next/router';
import FirebaseContext from '../firebase/context';
import { ROUTES, ACCOUNT_TYPE } from '../../constants';

function SignInPage(props) {
  const firebase = useContext(FirebaseContext);
  const [errorMessage, setErrorMessage] = useState('');
  const handleGoogleSignIn = () => {
    firebase
      .doGoogleSignIn()
      .then((authUser = {}) => {
        const { user: { displayName: fullName, email, photoURL: avatarUrl } = {} } = authUser;

        return firebase.user(authUser.user.uid).set({
          accountType: ACCOUNT_TYPE.FREE,
          fullName,
          email,
          avatarUrl,
        });
      })
      .then(() => {
        console.log('Authentication successful!')
        // props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleSignOut = () => {
    firebase.doSignOut();
  };
  return (
    <div>
      <h3>Sign In Page</h3>
      <button onClick={handleGoogleSignIn}>Sign In with Google </button>
      <button onClick={handleSignOut}>Logout</button>
      {!!errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default SignInPage;
