import express from 'express';
import { db } from '../config/db';

export const rolesRoutes = express.Router();

rolesRoutes.get('/api/roles', async (req: any, res: any) => {

    try {
        const result: any = await db.query('SELECT * FROM roles');
        res.json(result[0]);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
