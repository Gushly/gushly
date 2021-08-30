import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import FirebaseContext from '../components/firebase/context';
import { ROUTES } from '../constants'

const withAuthorization = (Component) => {
  const NewComponent = (props) => {
    const firebase = useContext(FirebaseContext);
    const router = useRouter();

    const next = (authUser) => {
      if (!authUser) {
        router.push(ROUTES.HOME);
      }
    };
    const fallback = () => router.push(ROUTES.HOME);
    useEffect(() => {
      firebase.onAuthChangeListener(next, fallback);
    }, []);

    return props.user && props.user.uid ? (
      <Component {...props} />
    ) : (
      <p>You need to sign in to access this page </p>
    );
  };

  const mapStateToProps = (state) => ({
    user: state.session.user,
  });
  const component1 = connect(mapStateToProps)(NewComponent);
  return component1
};

export default withAuthorization;
