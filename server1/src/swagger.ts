import swaggerAutogen  from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:3000',
};

const outputFile = './dist/swagger-output.json';
const routes = [
  './src/routes/auth.ts',
  './src/routes/roles.ts',
  './src/routes/users.ts',
  './src/routes/expenses.ts',
  './src/routes/payments.ts',
  './src/routes/incomes.ts',
  './src/routes/areas.ts',
  
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);