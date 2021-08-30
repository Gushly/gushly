import { _receiver_pays } from '../config.js'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

console.log(_receiver_pays)

import ReceiverPays from '../artifacts/contracts/ReceiverPays.sol/ReceiverPays.json'

let nonce = 11;

export async function signPayment(recipient, amount) {

  console.log({ recipient, amount })

  const web3Modal = new Web3Modal()

  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()

  console.log("Address: ", signer.address)


  const hash = ethers.utils.solidityKeccak256(
    ["address", "uint256", "uint256", "address"],
    [recipient, amount, nonce, _receiver_pays]);

  console.log(hash);
  const hashArr = ethers.utils.arrayify(hash)
  const message = await signer.signMessage(hashArr);
  // nonce++;
  console.log(ethers.utils.verifyMessage(hashArr, message));
  return message
}


export async function claimPayment(amount, signature) {

  const web3Modal = new Web3Modal()

  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection)

  const signer = provider.getSigner()
  const contract = new ethers.Contract(_receiver_pays, ReceiverPays.abi, signer)

  console.log("signature", signature)
  let transaction = await contract.claimPayment(amount, nonce, signature)
  transaction = await transaction.wait();
  console.log(transaction)
  return transaction;
}

// signPayment()