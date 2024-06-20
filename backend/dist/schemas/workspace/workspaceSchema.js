"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(1, { message: "First name is required" }),
    last_name: zod_1.z.string().min(1, { message: "Last name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 8 characters" }),
    username: zod_1.z.string().min(1, { message: "Username is required" }),
    position: zod_1.z.string().optional(),
    language: zod_1.z.string().optional(),
});
exports.userSchema = userSchema;
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 8 characters" }),
});
exports.loginSchema = loginSchema;
