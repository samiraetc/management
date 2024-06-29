"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectLabelByName = exports.selectLabel = exports.createLabel = exports.selectAllLabels = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const selectAllLabels = () => __awaiter(void 0, void 0, void 0, function* () {
    const labels = yield prisma.label.findMany();
    return labels;
});
exports.selectAllLabels = selectAllLabels;
const selectLabel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const label = yield prisma.label.findUnique({
        where: { id },
    });
    return label;
});
exports.selectLabel = selectLabel;
const selectLabelByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const label = yield prisma.label.findUnique({
        where: { name },
    });
    return label;
});
exports.selectLabelByName = selectLabelByName;
const createLabel = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, color }) {
    const label = yield prisma.label.create({
        data: {
            name,
            color,
        },
    });
    return label;
});
exports.createLabel = createLabel;
