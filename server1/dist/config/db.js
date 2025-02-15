"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const pool = mysql2_1.default.createPool({
    host: 'localhost',
    user: 'myuser',
    password: 'mypassword',
    database: 'mydatabase'
});
exports.db = pool.promise();
//# sourceMappingURL=db.js.map