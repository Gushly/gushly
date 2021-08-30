import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
};

// console.log(config)
// console.log(app)

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }
    this.db = app.firestore();
    this.auth = app.auth();

    this.googleAuthProvider = new app.auth.GoogleAuthProvider();
  }

  doGoogleSignIn = () => this.auth.signInWithPopup(this.googleAuthProvider);

  user = (uid) => this.db.collection('users').doc(uid);

  doSignOut = () => this.auth.signOut();

  onAuthChangeListener = (next, fallback = () => { }) => {
    return this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then((doc) => {
            let dbUser = {};
            if (doc.exists) {
              dbUser = doc.data();
            }
            console.log("DB user:: ", dbUser)
            const user = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              ...dbUser,
            };
            // console.log(`authUser:: listener:: ${user}`);
            next(user);
          });
      } else {
        console.log(`Now user is not available`);
        fallback();
      }
    });
  };
}

export default new Firebase();
