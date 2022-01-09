import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x4ca302bb77e4ecf55865077e16774f53426a5607'
);

export default instance;
