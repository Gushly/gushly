const hre = require("hardhat");
const fs = require('fs');


// We can use this template to deploy our Harmony contracts
async function main(contractName, params) {
  const Contract = await hre.ethers.getContractFactory(contractName);

  const accounts = await hre.ethers.getSigners();
  console.log(accounts[0].address)
  let contract
  if (params) {
    contract = await Contract.deploy(params);
  } else {
    contract = await Contract.deploy({
      value: hre.ethers.utils.parseEther('10'),
    });
  }
  await contract.deployed();
  console.log(`${contractName} deployed to: ${contract.address}`);

  const camelCaseContractName = contractName.replace(/([A-Z])/g, '_$1').toLowerCase();
  let config = `
  export const ${camelCaseContractName} = "${contract.address}"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))
}



(async function () {
  try {
    // Here change contract name and param
    await main("ReceiverPays");
    process.exit(0)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})()
