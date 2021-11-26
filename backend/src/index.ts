import { RestApi } from './consumers/rest_api/express';

const restApi = new RestApi(
    {
        port: '8000',
        isProduction: false,
    },
);

restApi.start();
console.info('⚡️[server]: Express rest api started');
