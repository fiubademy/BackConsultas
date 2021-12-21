const routes = require("./routes/routes");
const fastify = require("fastify")({ logger: true });
const startClientDB = require("./database").startDB;

fastify.register(require("fastify-swagger"), {
  routePrefix: "/docs",
  exposeRoute: true,
  swagger: {
    info: {
      title: "API Consultas",
      description: "API de consultas para la app Ubademy",
      version: "1.0.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host:
      process.env.SWAGGER_HEROKU_URL ||
      "localhost:" + (process.env.PORT || 8010),
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

fastify.register(require("fastify-cors"), {
  origin: "*",
  methods: ["*"],
  headers: ["*"],
});

routes.forEach((route) => fastify.route(route()));

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 8010, "0.0.0.0");
    await startClientDB();
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
