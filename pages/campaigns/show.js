import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';

import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import ContributeForm from '../../components/ContributeForm';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

export async function getServerSideProps(ctx) {
  const campaign = Campaign(ctx.query.address);
  const summary = await campaign.methods.getSummary().call();
  // const campaigns = await factory.methods.getDeployedCampaigns().call();

  return {
    props: {
      address: ctx.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
}

const CampaignShow = (props) => {
  const renderCards = ({
    minimumContribution,
    balance,
    manager,
    requestsCount,
    approversCount,
  }) => {
    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'Contribute at least this amount of wei to become a contributor',
      },
      {
        header: requestsCount,
        meta: 'Number of requests',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers',
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Number of people',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money this campaign has left to spend',
      },
    ];

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards(props)}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${props.address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export default CampaignShow;
