"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
exports.authRoutes = express_1.default.Router();
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
exports.authRoutes.post('/api/user', async (req, res) => {
    const { description, name, phone, phone2, email, password } = req.body;
    try {
        bcrypt_1.default.hash(password, saltRounds, async function (err, hash) {
            const result = await db_1.db.query("INSERT INTO users (description, name, phone, phone2, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)", [description, name, phone, phone2, email, hash]);
            if (result) {
                res.status(200).send();
            }
        });
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.authRoutes.put('/api/user', async (req, res) => {
    const { id, description, name, phone, phone2, email } = req.body;
    try {
        const result = await db_1.db.query("UPDATE users SET description = ?, name = ?, phone = ?, phone2 = ?, email = ? WHERE id = ?", [description, name, phone, phone2, email, id]);
        if (result[0].affectedRows) {
            res.status(200).send();
        }
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.authRoutes.delete('/api/user', async (req, res) => {
    const { id } = req.body;
    try {
        const result = await db_1.db.query("UPDATE users SET deleted = 1 WHERE id = ?", [id]);
        if (result[0].affectedRows) {
            res.status(200).send();
        }
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.authRoutes.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db_1.db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0)
            return res.status(401).send('User not found');
        const user = users[0];
        const match = await bcrypt_1.default.compare(password, user.password);
        if (!match)
            return res.status(401).send('Incorrect password');
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
//# sourceMappingURL=auth.js.map