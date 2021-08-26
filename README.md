# Dapp starter kit

## Tech stack
- NextJS
- Tailwind
- Typescript
- Hardhat



## Steps to deploy your contract on Harmony testnet using Metamask
1. Add a new network on Metamask from metamask settings
   ![Harmony test network configuration for metamask](public/harmony_testnet_metamask.png)

2. Add test faucet in your account from 👇 URL
3. export your account secret key and paste it in `..secret` file at the root level.
   ![Export wallet key](public/wallet_key_export.png)


4. Run `yarn run deploy:contract:testnet` to deploy contract on testnet
## Important commands


1. Start local Hardhat network
```
npx hardhat node
```

2. Get all accounts
```
npx hardhat accounts
```

3. Compile contracts
```
npx hardhat compile
```

4. Run test cases
```
npx hardhat test
```

5. Deploy contract on a network
```
npx hardhat run scripts/deploy.js --network <network-name>
```


## Important Urls

1. Harmony mainnet URL 1: `https://api.s0.t.hmny.io`
2. Harmony mainnet URL 2: `https://api.harmony.one/`
3. Harmony testnet URL: `https://api.s0.b.hmny.io/`
4. Testnet Faucet URL:`https://faucet.pops.one/`, `https://onefaucet.ibriz.ai/`
1. Mainnet block explorer URL: `https://explorer.harmony.one/`
2. Testnet block explorer URL: `https://explorer.pops.one/`
3. To convert **bech32** address to Ethereum style hex address
`https://explorer.harmony.one/#/address/one1pdv9lrdwl0rg5vglh4xtyrv3wjk3wsqket7zxy`

4. Check Harmony Network status: `https://status.harmony.one/`
5. 
