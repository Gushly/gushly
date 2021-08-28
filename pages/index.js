import { useState } from "react"
import withAuthentication from '../hooks/withAuthentication'
import Web3Modal from "web3modal"
import { ethers } from 'ethers'
import SignIn from "../components/SignIn/SignIn"
// import { ballotAddress } from "../config"

// import Ballot from '../artifacts/contracts/Ballot.sol/Ballot.json'


function Home() {

  const [address, setAddress] = useState('')

  // async function giveRightToVote(address) {
  //   const web3Modal = new Web3Modal()
  //   const connection = await web3Modal.connect();
  //   const provider = new ethers.providers.Web3Provider(connection)
  //   const signer = provider.getSigner()

  //   const contract = new ethers.Contract(ballotAddress, Ballot.abi, signer)

  //   let transaction = await contract.giveRightToVote(address)

  //   transaction = await transaction.wait();
  //   console.log(transaction)
  // }

  return (<div className="container max-w-md mt-10 mx-auto ">
    {/* <input className="w-full p-2 mr-2 border-2" type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
    <button className="primary btn" onClick={() => giveRightToVote(address)}>Give right to vote</button>
    <br /> */}
    <h1>Hello Streampay</h1>
    <SignIn />

  </div>)
}

export default withAuthentication(Home)