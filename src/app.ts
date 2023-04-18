import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { loadApiEndpoints } from "./controllers/api";
import { loadTestApiEndpoints } from "./controllers/test/api";
import swaggerOptions from "../swaggerOptions";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT ?? 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));

// Swagger setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

(process.env.RUN_PROD_ENV === "true") ? loadApiEndpoints(app) : loadTestApiEndpoints(app)

export default app;
