import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

const RequestRow = ({ address, id, request, approversCount }) => {
  const { Row, Cell } = Table;

  const readyToFinalze = request.approvalCount > approversCount / 2;
  const onApprove = async () => {
    try {
      const campaign = Campaign(address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onFinalize = async () => {
    try {
      const campaign = Campaign(address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalze && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {request.complete ? (
          <Button disabled>Approved</Button>
        ) : (
          <Button color="green" circular onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        <Button color="red" onClick={onFinalize}>
          Finalize
        </Button>
      </Cell>
    </Row>
  );
};

export default RequestRow;
