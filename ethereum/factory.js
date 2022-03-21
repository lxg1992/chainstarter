import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xb075E4D66B856f199AE5252B133320b4aAb4bb1F'
);

export default instance;
