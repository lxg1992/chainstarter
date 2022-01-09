import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x9d787053f9839966A664b0e14e9C26a3684F6E44'
);

export default instance;
