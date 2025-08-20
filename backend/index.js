// ESM
import Fastify from 'fastify';
import routes from './src/routes/index.js';
import cors from "@fastify/cors";
import { FastifySSEPlugin } from "fastify-sse-v2";

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
});

fastify.register(FastifySSEPlugin);

await fastify.register(cors, { origin: 'http://localhost:3000' });

fastify.register(routes);

fastify.listen({ port: process.env.PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
