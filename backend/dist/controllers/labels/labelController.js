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
exports.createLabelController = exports.AllLabelController = void 0;
const labels_1 = require("@/models/labels/labels");
const labelsSchema_1 = require("@/schemas/labels/labelsSchema");
const AllLabelController = (_, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const labels = yield (0, labels_1.selectAllLabels)();
        reply.code(200).send({ data: labels });
    }
    catch (error) {
        reply.code(400).send({ error: "Failed to fetch labels" });
    }
});
exports.AllLabelController = AllLabelController;
const createLabelController = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = labelsSchema_1.labelSchema.parse(request.body);
        const body = {
            name: parsedBody.name,
            color: parsedBody.color,
        };
        const label = yield (0, labels_1.createLabel)(body);
        reply.code(201).send({ data: label });
    }
    catch (error) {
        reply.code(400).send({ error: "Failed to create label", details: error });
    }
});
exports.createLabelController = createLabelController;
