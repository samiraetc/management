"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelSchema = void 0;
const zod_1 = require("zod");
const labelSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1, "Name is required"),
    color: zod_1.z.string().min(1, "Color is required"),
});
exports.labelSchema = labelSchema;
