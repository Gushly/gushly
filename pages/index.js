import { useState } from "react"
import withAuthentication from '../hooks/withAuthentication'
import Web3Modal from "web3modal"
import { ethers } from 'ethers'
import SignIn from "../components/SignIn/SignIn"
import { sen } from '../utils/mail'
import { sendMail } from '../utils/mail'
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

  return (<div className="">
    Welcome to Gushly
    <button onClick={() => sendMail()}>Send Email</button>
  </div>)
}

export default withAuthentication(Home)