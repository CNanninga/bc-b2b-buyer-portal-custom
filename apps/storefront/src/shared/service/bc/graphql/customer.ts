import { platform } from '@/utils/basicConfig';

import B3Request from '../../request/b3Fetch';

export interface RegisterCustomerInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterCustomerMutationResponse {
  data?: {
    customer?: {
      registerCustomer?: {
        customer?: {
          entityId: number | null;
          email: string | null;
        };
      };
    };
  };
  errors?: Array<{ message: string }>;
}

const REGISTER_CUSTOMER_MUTATION = `mutation RegisterCustomer($input: RegisterCustomerInput!) {
  customer {
    registerCustomer(input: $input) {
      customer {
        entityId
        email
      }
    }
  }
}`;

export async function registerCustomer(
  input: RegisterCustomerInput,
): Promise<RegisterCustomerMutationResponse> {
  const variables = { input };
  return platform === 'bigcommerce'
    ? B3Request.graphqlBC<RegisterCustomerMutationResponse>({
        query: REGISTER_CUSTOMER_MUTATION,
        variables,
      })
    : B3Request.graphqlBCProxy<RegisterCustomerMutationResponse>({
        query: REGISTER_CUSTOMER_MUTATION,
        variables,
      });
}
