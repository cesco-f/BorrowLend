const isTest: boolean = process.env.NODE_ENV === 'test';

export default {
  port: process.env.PORT || 3000,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 5432,
  dbType: process.env.DB_TYPE || 'postgres',
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: isTest ? process.env.DB_NAME_TEST : process.env.DB_NAME,
}
