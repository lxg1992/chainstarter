import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';

export async function getServerSideProps(ctx) {
  const campaign = Campaign(ctx.query.address);
  const summary = await campaign.methods.getSummary().call();
  console.log(summary);
  // const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { props: { summary } };
}

const CampaignShow = () => {
  return (
    <Layout>
      <h3>Campaign Show</h3>
    </Layout>
  );
};

export default CampaignShow;
