import API from '@aws-amplify/api';
import { EVENT_API } from '@/constants/api.constants';

import { getToken } from '@/services/authentication.service';

API.configure({
  API: {
    endpoints: [
      {
        name: EVENT_API,
        endpoint: 'https://rgz3pv5m90.execute-api.eu-central-1.amazonaws.com/test', // This will change when deploying new tests
        custom_header: async () => {
          return { Authorization: `Bearer ${await getToken()}` };
        }
      }
    ]
  }
});
