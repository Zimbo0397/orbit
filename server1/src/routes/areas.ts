import express from 'express';
import bcrypt from 'bcrypt';
import { db } from '../config/db';
import { ResultSetHeader } from 'mysql2'

export const areasRoutes = express.Router();

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

areasRoutes.get('/api/areas', async (req: any, res: any) => {
    const sql = `SELECT ar.id, ar.address, ar.electricity_meter, ar.created_at FROM areas as ar`;

    try {
        const result: any = await db.query(sql);
        res.json(result[0]);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// areasRoutes.post('/api/area', async (req: any, res: any) => {
//     const { description, name, phone, phone2, email, password } = req.body;

//     try {
//         bcrypt.hash(password, saltRounds, async function(err, hash) {
//             const result = await db.query("INSERT INTO users (description, name, phone, phone2, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)", [description, name, phone, phone2, email, hash]);
    
//             if (result) {
//                 res.status(200).send();
//             }
//         });
//     } catch (err) {
//         res.status(500).send('Server error');
//     }
// });

// areasRoutes.put('/api/area', async (req: any, res: any) => {
//     const { id, description, name, phone, phone2, email } = req.body;

//     try {
//         const result = await db.query<ResultSetHeader>("UPDATE users SET description = ?, name = ?, phone = ?, phone2 = ?, email = ? WHERE id = ?", [description, name, phone, phone2, email, id]);

//         if (result[0].affectedRows) {
//             res.status(200).send();
//         }
//     } catch (err) {
//         res.status(500).send('Server error');
//     }
// });

// areasRoutes.delete('/api/area', async (req: any, res: any) => {
//     const { id } = req.body;

//     try {
//         const result = await db.query<ResultSetHeader>("UPDATE users SET deleted = 1 WHERE id = ?", [id]);

//         if (result[0].affectedRows) {
//             res.status(200).send();
//         }
//     } catch (err) {
//         res.status(500).send('Server error');
//     }
// });

// areasRoutes.put('/api/resetuserpassword', async (req: any, res: any) => {
//     const { id, password } = req.body;

//     try {
//         bcrypt.hash(password, saltRounds, async function(err, hash) {
//             const result = await db.query<ResultSetHeader>("UPDATE users SET password = ? WHERE id = ?", [hash, id]);
    
//             if (result[0].affectedRows) {
//                 res.status(200).send();
//             }
//         });

//     } catch (err) {
//         res.status(500).send('Server error');
//     }
// });

