"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expensesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../config/db");
exports.expensesRoutes = express_1.default.Router();
exports.expensesRoutes.get('/api/expenses', async (req, res) => {
    try {
        const result = await db_1.db.query('SELECT types.title, expenses.id, expenses.description, expenses.amount, expenses.created_at FROM `coop_expenses` as expenses JOIN coop_expenses_types as types ON expenses.expenses_type = types.id;');
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.expensesRoutes.post('/api/expenses', async (req, res) => {
    const { amount, description, expensesTypeId } = req.body;
    try {
        const createExpenseResult = await db_1.db.query("INSERT INTO coop_expenses (amount, description, expenses_type) VALUES (?, ?, ?)", [amount, description, expensesTypeId]);
        if (createExpenseResult) {
            res.status(200).send();
        }
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.expensesRoutes.get('/api/expensesTypes', async (req, res) => {
    try {
        const result = await db_1.db.query('SELECT * FROM coop_expenses_types');
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.expensesRoutes.post('/api/expensesTypes', async (req, res) => {
    const { title } = req.body;
    try {
        const result = await db_1.db.query("INSERT INTO coop_expenses_types (title) VALUES (?)", [title]);
        if (result) {
            res.status(200).send();
        }
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.expensesRoutes.put('/api/expensesTypes', async (req, res) => {
    const { id, title } = req.body;
    try {
        const result = await db_1.db.query("UPDATE coop_expenses_types SET title = ? WHERE id = ?", [title, id]);
        if (result) {
            res.status(200).send();
        }
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.expensesRoutes.delete('/api/expensesTypes', async (req, res) => {
    const { id } = req.body;
    try {
        const result = await db_1.db.query("UPDATE coop_expenses_types SET deleted = 1 WHERE id = ?", [id]);
        if (result[0].affectedRows) {
            res.status(200).send();
        }
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
//# sourceMappingURL=expenses.js.map