import express from "express";
import routes from "@src/infrastructure/rest/routes";

export const app = express()
  .use(express.json())
  .use(routes);
