import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbconnection } from "./databases/database.js";
import router from "./routers/userRoutes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

dbconnection();

app.use("/api/users", router);

app.listen(port, () => console.log(`Server running on port ${port}`));
