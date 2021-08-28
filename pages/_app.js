import '../styles/globals.css'
import Link from 'next/link'
// import { DAppProvider, useEtherBalance, useEthers, ChainId } from '@usedapp/core'

// // supportedChainIds: ['1666600000', '1666700000', '1666700001', '1666700002', '1666700003'],
// const config = {
//   readOnlyChainId: ChainId.Harmony,

//   readOnlyUrls: {
//     [ChainId.Harmony]: "https://api.s0.b.hmny.io"
//   }
// }

function Marketplace({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Stream Pay</p>
        {/* <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-pink-500">
              Home
            </a>
          </Link>
          <Link href="/create-item">
            <a className="mr-6 text-pink-500">
              Sell Digital Asset
            </a>
          </Link>
          <Link href="/my-assets">
            <a className="mr-6 text-pink-500">
              My Digital Assets
            </a>
          </Link>
          <Link href="/creator-dashboard">
            <a className="mr-6 text-pink-500">
              Creator Dashboard
            </a>
          </Link>
        </div> */}
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default Marketplace