const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');



const provider = new HDWalletProvider(
  'amused volcano magnet danger divert lion floor emotion great comfort mushroom hen',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/93a4e025e7824a16b28d467676f262d8'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
  //0x30152D971f81FBaa1778c0677bBA6B54bb68Caa5
};
deploy();
