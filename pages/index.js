import React, { useEffect, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import factory from '../ethereum/factory';

export default () => {
  useAsyncEffect(
    async (isMounted) => {
      console.log('mount');
      const campaign = await factory.methods.getDeployedCampaigns().call();
      if (!isMounted()) {
        return;
      }
    },
    () => console.log('unmount'),
    []
  );

  return <h1>This is the index page!!!</h1>;
};
