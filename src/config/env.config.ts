import dotenv from 'dotenv';

dotenv.config();

type EnvironmentName = 'dev' | 'qa' | 'prod';

const environment = (process.env.ENV || 'qa') as EnvironmentName;

const defaultBaseUrls: Record<EnvironmentName, string> = {
  dev: 'http://localhost:3000',
  qa: 'http://localhost:3000',
  prod: 'https://jsonplaceholder.typicode.com',
};

export const envConfig = {
  environment,
  baseUrl: process.env.BASE_URL || defaultBaseUrls[environment],
  shouldStartMockServer: !process.env.BASE_URL && environment !== 'prod',
};
