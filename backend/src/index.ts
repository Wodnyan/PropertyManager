import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import { notFound, defaultErrorHandler } from "./lib/middlewares/";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(notFound)
app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
