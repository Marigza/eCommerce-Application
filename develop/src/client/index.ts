import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { NewCustomerData } from './client-types';
import { ctpClient, projectKey } from './ClientBuilder';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: projectKey,
});

export const createCustomer = async (newCustomerData: NewCustomerData) => {
  return apiRoot
    .customers()
    .post({
      body: newCustomerData,
    })
    .execute();
};

export const findCustomerByEmail = async (email: string) => {
  return apiRoot.customers().withEmailToken({ emailToken: email }).get().execute();
};
