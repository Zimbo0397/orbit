"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../config/db");
exports.usersRoutes = express_1.default.Router();
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
exports.usersRoutes.get('/api/users', async (req, res) => {
    const sql = `
        SELECT us.id, us.email, us.name, us.phone, us.phone2, r.name as role, us.created_at, us.description FROM users as us
        JOIN roles as r
        ON us.role_id = r.id
    `;
    try {
        const result = await db_1.db.query(sql);
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
exports.usersRoutes.post('/api/user', async (req, res) => {
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
exports.usersRoutes.put('/api/user', async (req, res) => {
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
exports.usersRoutes.delete('/api/user', async (req, res) => {
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
exports.usersRoutes.put('/api/resetuserpassword', async (req, res) => {
    const { id, password } = req.body;
    try {
        bcrypt_1.default.hash(password, saltRounds, async function (err, hash) {
            const result = await db_1.db.query("UPDATE users SET password = ? WHERE id = ?", [hash, id]);
            if (result[0].affectedRows) {
                res.status(200).send();
            }
        });
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
//# sourceMappingURL=users.js.map