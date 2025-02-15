"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../config/db");
exports.paymentsRoutes = express_1.default.Router();
exports.paymentsRoutes.get('/api/payments', async (req, res) => {
    const sql = `
        SELECT pay.amount, pay.id, ar.address, types.title, pay.created_at FROM payments as pay
        JOIN areas as ar
        ON ar.id = pay.area_id
        JOIN payments_types as types
        ON types.id = pay.payment_type_id
    `;
    try {
        const result = await db_1.db.query(sql);
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.paymentsRoutes.post('/api/payments', async (req, res) => {
    const { amount, payment_type_id, area_id } = req.body;
    try {
        const createExpenseResult = await db_1.db.query("INSERT INTO payments (amount, payment_type_id, area_id) VALUES (?, ?, ?)", [amount, payment_type_id, area_id]);
        if (createExpenseResult) {
            res.status(200).send();
        }
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.paymentsRoutes.get('/api/paymentsTypes', async (req, res) => {
    try {
        const result = await db_1.db.query('SELECT * FROM payments_types');
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.paymentsRoutes.post('/api/paymentsTypes', async (req, res) => {
    const { title } = req.body;
    try {
        const result = await db_1.db.query("INSERT INTO payments_types (title) VALUES (?)", [title]);
        if (result) {
            res.status(200).send();
        }
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.paymentsRoutes.put('/api/paymentsTypes', async (req, res) => {
    const { id, title } = req.body;
    try {
        const result = await db_1.db.query("UPDATE payments_types SET title = ? WHERE id = ?", [title, id]);
        if (result) {
            res.status(200).send();
        }
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.paymentsRoutes.delete('/api/paymentsTypes', async (req, res) => {
    const { id } = req.body;
    try {
        const result = await db_1.db.query("UPDATE payments_types SET deleted = 1 WHERE id = ?", [id]);
        if (result[0].affectedRows) {
            res.status(200).send();
        }
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
//# sourceMappingURL=payments.js.map