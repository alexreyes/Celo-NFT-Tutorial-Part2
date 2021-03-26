const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');
const NFTContract = require('./build/contracts/CoolNFT.json');

require('dotenv').config();

const main = async () => {
  const web3 = new Web3(process.env.REST_URL);
  const client = ContractKit.newKitFromWeb3(web3);

  const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);

  const networkId = await web3.eth.net.getId();

  // Get the contract associated with the current network
  const deployedNetwork = NFTContract.networks[networkId];

  console.log(networkId)

  if (!deployedNetwork) {
    throw new Error(`${networkId} is not valid`);
  }

  let instance = new web3.eth.Contract(
    NFTContract.abi,
    deployedNetwork.address
  );

  let balanceBefore = await instance.methods.tokenCounter().call();
  console.log('NFTs minted before:', balanceBefore);

  // const txObject = await instance.methods.createCollectible("https://csoojw5enuwdumaf4s24vhdglm6mqg6kxun6ooofwzc6hwgz2x3q.arweave.net/FJzk26RtLDowBeS1ypxmWzzIG8q9G-c5xbZF49jZ1fc");
  // let tx = await client.sendTransactionObject(txObject, { from: account.address })

  // let receipt = await tx.waitReceipt()
  // console.log(receipt)

  // let receipt = await tx.waitReceipt();
  // console.log('Sent coin smart contract call receipt: ', receipt);

  console.log('address: ', account.address);
  console.log('privateKey: ', account.privateKey);
};

main().catch((err) => {
  console.error(err);
});