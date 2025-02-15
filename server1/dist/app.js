"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const node_fs_1 = require("node:fs");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const auth_1 = require("./routes/auth");
const roles_1 = require("./routes/roles");
const users_1 = require("./routes/users");
const expenses_1 = require("./routes/expenses");
const payments_1 = require("./routes/payments");
const incomes_1 = require("./routes/incomes");
const areas_1 = require("./routes/areas");
exports.routes = express.Router();
// const userRoutes = require('./routes/users');
// const expenseRoutes = require('./routes/expenses');
// const incomeRoutes = require('./routes/incomes');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const swaggerFile = JSON.parse((0, node_fs_1.readFileSync)('./dist/swagger-output.json').toString());
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// Роутинг
exports.routes.use(auth_1.authRoutes);
exports.routes.use(roles_1.rolesRoutes);
exports.routes.use(users_1.usersRoutes);
exports.routes.use(expenses_1.expensesRoutes);
exports.routes.use(payments_1.paymentsRoutes);
exports.routes.use(incomes_1.incomesRoutes);
exports.routes.use(areas_1.areasRoutes);
app.use('/', exports.routes);
// app.use('/api/users', userRoutes);
// app.use('/api/expenses', expenseRoutes);
// app.use('/api/incomes', incomeRoutes);
app.listen(3000, () => console.log('Server running on port 3000'));
//# sourceMappingURL=app.js.map