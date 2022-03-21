import React, { useState } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';

import { Router } from '../../routes';

import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

const CampaignNew = () => {
  const [minContribution, setMinContribution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods.createCampaign(minContribution).send({
        from: accounts[0],
      });
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsLoading(false);
    Router.pushRoute('/');
  };

  return (
    <Layout>
      <h3> Create a campaign </h3>
      <Form error={!!errorMessage} onSubmit={onSubmit}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            placeholder="0"
            value={minContribution}
            onChange={(e) => setMinContribution(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={isLoading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
