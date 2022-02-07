import React, { useState } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';

import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

const CampaignNew = () => {
  const [minContribution, setMinContribution] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    await factory.methods.createCampaign(minContribution).send({
      from: accounts[0],
    });
  };

  return (
    <Layout>
      <h3> Create a campaign </h3>

      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            placeholder=""
            value={minContribution}
            onChange={(e) => setMinContribution(e.target.value)}
          />
        </Form.Field>

        <Button primary>Create!</Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
