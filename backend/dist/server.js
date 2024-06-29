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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const jwt_1 = __importDefault(require("@fastify/jwt"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const dotenv_1 = __importDefault(require("dotenv"));
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const server = (0, fastify_1.default)({
    logger: true,
});
exports.server = server;
// Configuração do fastify-swagger
server.register(swagger_1.default, {
    openapi: {
        info: {
            title: 'Minha API',
            description: 'Documentação da API usando OpenAPI 3',
            version: '0.1.0',
        },
        servers: [{ url: 'http://localhost:3000' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
});
server.register(swagger_ui_1.default, {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
        displayRequestDuration: true,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject) => {
        return swaggerObject;
    },
    transformSpecificationClone: true,
});
server.register(jwt_1.default, {
    secret: process.env.SECRET_KEY,
});
server.decorate('authenticate', function (request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield request.jwtVerify();
        }
        catch (err) {
            reply.send(err);
        }
    });
});
server.register(routes_1.default, { prefix: '/api' });
server.get('/api', (_, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        reply.send({ hello: 'world' });
    }
    catch (err) {
        server.log.error(err);
        reply.status(500).send('Database error');
    }
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server is running on http://localhost:3000/api');
        console.log('Swagger documentation is available on http://localhost:3000/documentation');
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
if (require.main === module) {
    start();
}
