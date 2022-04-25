import React, { useState } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';

import campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';

export async function getServerSideProps(ctx) {
  return {
    props: {
      address: ctx.query.address,
    },
  };
}

const RequestNew = ({ address }) => {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({
          from: accounts[0],
        });

      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (err) {
      setErrorMsg(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Link route={`/campaigns/${address}/address`}>
        <a>
          <Button secondary>Back</Button>
        </a>
      </Link>
      <h3>Create a request</h3>
      <Form onSubmit={onSubmit} error={!!errorMsg}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={({ target }) => setRecipient(target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMsg} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default RequestNew;
