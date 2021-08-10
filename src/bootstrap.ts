import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import routes from "@src/infrastructure/rest/routes";

export const app = express()
  .use(express.json())
  .use(compression())
  .use(helmet())
  .use(cors({ origin: process.env.CORS ?? '*' }))
  .use(routes);
