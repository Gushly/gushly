import '../styles/globals.css'
import 'antd/dist/antd.css';
import App from 'next/app'
import { END } from 'redux-saga'
import SiteLayout from '../components/SiteLayout/SiteLayout'
import { wrapper } from '../store'
import FirebaseContext from '../components/firebase/context'
import firebase
  from '../components/firebase/firebase'


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


export default wrapper.withRedux(WrappedApp);