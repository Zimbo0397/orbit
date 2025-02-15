import express from 'express';
import { db } from '../config/db';

export const incomesRoutes = express.Router();

incomesRoutes.get('/api/incomes', async (req: any, res: any) => {
    const sql = `
        SELECT inc.amount, inc.created_at, types.title, ar.address
        FROM incomes as inc
        JOIN areas as ar ON ar.id = inc.area_id
        JOIN payments_types as types
        ON types.id = inc.payment_type;
    `;

    try {
        const result: any = await db.query(sql);
        res.json(result[0]);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
