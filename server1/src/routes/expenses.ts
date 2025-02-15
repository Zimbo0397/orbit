

import express from 'express';
import { db } from '../config/db';
import { QueryResult, ResultSetHeader } from 'mysql2'

export const expensesRoutes = express.Router();

expensesRoutes.get('/api/expenses', async (req: any, res: any) => {

    try {
        const result: any = await db.query('SELECT types.title, expenses.id, expenses.description, expenses.amount, expenses.created_at FROM `coop_expenses` as expenses JOIN coop_expenses_types as types ON expenses.expenses_type = types.id;');
        res.json(result[0]);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

expensesRoutes.post('/api/expenses', async (req: any, res: any) => {
    const { amount, description, expensesTypeId }: {amount: string, description: string, expensesTypeId: number} = req.body;

    try {
        const createExpenseResult = await db.query<ResultSetHeader>("INSERT INTO coop_expenses (amount, description, expenses_type) VALUES (?, ?, ?)", [amount, description, expensesTypeId]);
        if (createExpenseResult) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});

expensesRoutes.get('/api/expensesTypes', async (req: any, res: any) => {

    try {
        const result: any = await db.query('SELECT * FROM coop_expenses_types');
        res.json(result[0]);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

expensesRoutes.post('/api/expensesTypes', async (req: any, res: any) => {
    const { title } = req.body;

    try {
        const result = await db.query("INSERT INTO coop_expenses_types (title) VALUES (?)", [title]);

        if (result) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});

expensesRoutes.put('/api/expensesTypes', async (req: any, res: any) => {
    const { id, title } = req.body;

    try {
        const result = await db.query("UPDATE coop_expenses_types SET title = ? WHERE id = ?", [title, id]);

        if (result) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});

expensesRoutes.delete('/api/expensesTypes', async (req: any, res: any) => {
    const { id } = req.body;

    try {
        const result = await db.query<ResultSetHeader>("UPDATE coop_expenses_types SET deleted = 1 WHERE id = ?", [id]);

        if (result[0].affectedRows) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});