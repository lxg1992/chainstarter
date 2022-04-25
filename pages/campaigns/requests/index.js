import React from 'react';
import { Button, Table } from 'semantic-ui-react';

import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

export async function getServerSideProps(ctx) {
  const { address } = ctx.query;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((el, i) => {
        return campaign.methods.requests(i).call();
      })
  );

  return {
    props: {
      address,
      requests: JSON.parse(JSON.stringify(requests)),
      requestCount,
    },
  };
}

const RequestIndex = (props) => {
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRows = () => {
    return props.requests.map((request, idx) => {
      return (
        <RequestRow
          id={idx}
          request={request}
          key={idx}
          address={props.address}
        />
      );
    });
  };

  return (
    <Layout>
      <h3>Request List</h3>
      <Link route={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
    </Layout>
  );
};

export default RequestIndex;
