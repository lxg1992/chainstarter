// node_modules
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { Link } from '../routes';

// crypto
import factory from '../ethereum/factory';

// react
import Layout from '../components/Layout';

export async function getServerSideProps(ctx) {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { props: { campaigns } };
}

export default ({ campaigns }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              content="Create Campaign"
              icon="add circle"
              primary
              floated="right"
            />
          </a>
        </Link>
        {renderCampaigns()}
      </div>
    </Layout>
  );
};
