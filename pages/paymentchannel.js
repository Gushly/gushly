
import { useState } from 'react'
import { signPayment, claimPayment } from '../utils'
import { ethers } from 'ethers'


/*
0x7683f42f9638d353a579c2c4694f5e167b259ed9cb00770759f327fe1181a93a1bc9ce20a1f5d77ddda8fd65667a73e2c4c752e0cff0e86470e8820ca41b16da1b
*/

export default function PaymentChannel() {
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState(0)
  const [signedMessage, setSignedMessage] = useState('')

  const generateMessage = async () => {
    const formattedAmount = ethers.utils.parseEther(amount)
    console.log(formattedAmount)
    const message = await signPayment(address, formattedAmount)
    setSignedMessage(message)
  }

  const handleClaimPayment = async () => {
    const formattedAmount = ethers.utils.parseEther(amount)
    console.log(formattedAmount)
    const tx = await claimPayment(formattedAmount, signedMessage)
    console.log(tx)
  }

  return (<div>
    <input type="text" value={address} placeholder="Enter receiver address" onChange={e => setAddress(e.target.value)} />
    <input type="number" value={amount} placeholder="Enter amount" onChange={e => setAmount(e.target.value)} />
    <button onClick={generateMessage}> Generate Message</button>
    {signedMessage && <pre>{signedMessage}</pre>}

    <br />
    <br />

    <div>
      <h2>Claim payment</h2>
      <button onClick={handleClaimPayment}>Claim payment</button>
    </div>
  </div>)
}