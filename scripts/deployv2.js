const hre = require("hardhat");
const fs = require('fs');


// We can use this template to deploy our Harmony contracts
async function main() {
  const GushlyToken = await hre.ethers.getContractFactory("GushlyToken");
  const gushlyToken = await GushlyToken.deploy();
  await gushlyToken.deployed();
  console.log("gushlyToken deployed to:", gushlyToken.address);

  const Faucet = await hre.ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy(gushlyToken.address, 100000000, 10);
  await faucet.deployed();
  console.log("faucet deployed to:", faucet.address);

  let config = `
  export const gushlyTokenAddress = "${gushlyToken.address}"
  export const faucetAddress = "${faucet.address}"
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
