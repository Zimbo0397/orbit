"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../config/db");
exports.rolesRoutes = express_1.default.Router();
exports.rolesRoutes.get('/api/roles', async (req, res) => {
    try {
        const result = await db_1.db.query('SELECT * FROM roles');
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
//# sourceMappingURL=roles.js.map