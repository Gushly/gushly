const hre = require("hardhat");
const fs = require('fs');


const proposals = ["NFT app", "Stablecoin app", "Cross chain finance"]
// We can use this template to deploy our Harmony contracts
async function main() {
  const Ballot = await hre.ethers.getContractFactory("Ballot");
  const ballot = await Ballot.deploy(proposals);
  await ballot.deployed();
  console.log("ballot deployed to:", ballot.address);

  // const Faucet = await hre.ethers.getContractFactory("Faucet");
  // const faucet = await Faucet.deploy(gushlyToken.address, 100000000, 10);
  // await faucet.deployed();
  // console.log("faucet deployed to:", faucet.address);

  let config = `
  export const ballotAddress = "${ballot.address}"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
