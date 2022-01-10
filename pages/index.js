import React, { useEffect, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import factory from '../ethereum/factory';

export async function getServerSideProps(ctx) {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return { props: { campaigns } };
}

export default ({ campaigns }) => {
  return (
    <h1>
      {campaigns &&
        campaigns.map((camp, key) => (
          <div key={key}>
            {key}:{camp}
          </div>
        ))}
    </h1>
  );
};
