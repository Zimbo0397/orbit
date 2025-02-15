import { readFileSync } from 'node:fs';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

import { authRoutes }  from './routes/auth';
import { rolesRoutes }  from './routes/roles';
import { usersRoutes }  from './routes/users';
import { expensesRoutes }  from './routes/expenses';
import { paymentsRoutes }  from './routes/payments';
import { incomesRoutes }  from './routes/incomes';
import { areasRoutes }  from './routes/areas';



export const routes = express.Router();

// const userRoutes = require('./routes/users');
// const expenseRoutes = require('./routes/expenses');
// const incomeRoutes = require('./routes/incomes');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const swaggerFile = JSON.parse(readFileSync('./dist/swagger-output.json').toString())
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Роутинг
routes.use(authRoutes);
routes.use(rolesRoutes);
routes.use(usersRoutes);
routes.use(expensesRoutes);
routes.use(paymentsRoutes);
routes.use(incomesRoutes);
routes.use(areasRoutes);

app.use('/', routes);
// app.use('/api/users', userRoutes);
// app.use('/api/expenses', expenseRoutes);
// app.use('/api/incomes', incomeRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));