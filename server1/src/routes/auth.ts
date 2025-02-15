import express from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { db } from '../config/db';
import { ResultSetHeader } from 'mysql2'

export const authRoutes = express.Router();

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

authRoutes.post('/api/user', async (req: any, res: any) => {
    const { description, name, phone, phone2, email, password } = req.body;

    try {
        bcrypt.hash(password, saltRounds, async function(err, hash) {
            const result = await db.query("INSERT INTO users (description, name, phone, phone2, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)", [description, name, phone, phone2, email, hash]);
    
            if (result) {
                res.status(200).send();
            }
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

authRoutes.put('/api/user', async (req: any, res: any) => {
    const { id, description, name, phone, phone2, email } = req.body;

    try {
        const result = await db.query<ResultSetHeader>("UPDATE users SET description = ?, name = ?, phone = ?, phone2 = ?, email = ? WHERE id = ?", [description, name, phone, phone2, email, id]);

        if (result[0].affectedRows) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});

authRoutes.delete('/api/user', async (req: any, res: any) => {
    const { id } = req.body;

    try {
        const result = await db.query<ResultSetHeader>("UPDATE users SET deleted = 1 WHERE id = ?", [id]);

        if (result[0].affectedRows) {
            res.status(200).send();
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});


authRoutes.post('/api/login', async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
        const [users]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(401).send('User not found');

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).send('Incorrect password');

        const token = jsonwebtoken.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
});
