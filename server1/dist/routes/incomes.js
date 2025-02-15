"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../config/db");
exports.incomesRoutes = express_1.default.Router();
exports.incomesRoutes.get('/api/incomes', async (req, res) => {
    const sql = `
        SELECT inc.amount, inc.created_at, types.title, ar.address
        FROM incomes as inc
        JOIN areas as ar ON ar.id = inc.area_id
        JOIN payments_types as types
        ON types.id = inc.payment_type;
    `;
    try {
        const result = await db_1.db.query(sql);
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).send('Server error');
    }
});
//# sourceMappingURL=incomes.js.map