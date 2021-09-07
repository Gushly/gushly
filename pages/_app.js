import '../styles/globals.css'
import 'antd/dist/antd.css';
import App from 'next/app'
import { END } from 'redux-saga'
import SiteLayout from '../components/SiteLayout/SiteLayout'
import { wrapper } from '../store'
import FirebaseContext from '../components/firebase/context'
import firebase
  from '../components/firebase/firebase'

// edit import web3reactprovider and ethers for wallet connection
import { Web3ReactProvider } from '@web3-react/core'
import ethers from 'ethers'


class WrappedApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    };
    if (ctx.req) {
      // ctx.store.dispatch(END);
      // await ctx.store.sagaTask.toPromise();
    }
    return {
      pageProps
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <FirebaseContext.Provider value={firebase}>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </FirebaseContext.Provider>
    )
  }
}

// function App({ Component, pageProps }) {
//   return (
//     <FirebaseContext.Provider value={firebase}>
//       <div>
//         <Header />
//         <Component {...pageProps} />
//       </div>
//     </FirebaseContext.Provider>
//   )
// }

//get ethers library 
    function getLibrary(provider) {
      return new ethers(provider)
    }

//wrap web3reactprovider as top most element and pass getlibrary
    function MyApp({ Component, pageProps }) {
      return (
        <Web3ReactProvider getLibrary={getLibrary}>
          <Component {...pageProps} />
        </Web3ReactProvider>
      )
    }

export default wrapper.withRedux(WrappedApp);