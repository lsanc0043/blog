import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db/db-connection.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => console.log(`sup, you are listening to port ${PORT}`));
