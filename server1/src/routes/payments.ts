

import express from 'express';
import { db } from '../config/db';
import { ResultSetHeader } from 'mysql2'

export const paymentsRoutes = express.Router();

paymentsRoutes.get('/api/payments', async (req: any, res: any) => {
    const sql = `
        SELECT pay.amount, pay.id, ar.address, types.title, pay.created_at FROM payments as pay
        JOIN areas as ar
        ON ar.id = pay.area_id
        JOIN payments_types as types
        ON types.id = pay.payment_type_id
    `;

    try {
        const result: any = await db.query(sql);
        res.json(result[0]);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

paymentsRoutes.post('/api/payments', async (req: any, res: any) => {
    const { amount, payment_type_id, area_id }: {amount: number, payment_type_id: number, area_id: number} = req.body;

    try {
        const createExpenseResult = await db.query<ResultSetHeader>("INSERT INTO payments (amount, payment_type_id, area_id) VALUES (?, ?, ?)", [amount, payment_type_id, area_id]);
        if (createExpenseResult) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});

paymentsRoutes.get('/api/paymentsTypes', async (req: any, res: any) => {

    try {
        const result: any = await db.query('SELECT * FROM payments_types');
        res.json(result[0]);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

paymentsRoutes.post('/api/paymentsTypes', async (req: any, res: any) => {
    const { title } = req.body;

    try {
        
        const result = await db.query("INSERT INTO payments_types (title) VALUES (?)", [title]);
        if (result) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});

paymentsRoutes.put('/api/paymentsTypes', async (req: any, res: any) => {
    const { id, title } = req.body;

    try {
        const result = await db.query("UPDATE payments_types SET title = ? WHERE id = ?", [title, id]);

        if (result) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});

paymentsRoutes.delete('/api/paymentsTypes', async (req: any, res: any) => {
    const { id } = req.body;

    try {
        const result = await db.query<ResultSetHeader>("UPDATE payments_types SET deleted = 1 WHERE id = ?", [id]);

        if (result[0].affectedRows) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});