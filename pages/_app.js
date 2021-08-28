import '../styles/globals.css'
import Header from '../components/Header'
import store from '../store'
import { Provider } from 'react-redux'
import FirebaseContext from '../components/firebase/context'
import firebase
  from '../components/firebase/firebase'



function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <FirebaseContext.Provider value={firebase}>
        <div>
          <Header />
          <Component {...pageProps} />
        </div>
      </FirebaseContext.Provider>
    </Provider>
  )
}

export default App;