import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "express-jwt";

const bodyParser = require("body-parser");

import "dotenv/config";
import {
  createNote,
  getArchivedNotes,
  getUnarchivedNotes,
} from "./controllers/Notes.controller";

export const app = express();
const port = process.env.PORT || 3001;
const database = process.env.DB_URL || "mongodb://localhost:27017/notes";
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true });

const jwtCheck = jwt({
  secret: process.env.JWT_SECRET || "jwt-secret",
  algorithms: process.env.JWT_SECRET?.split(",") || ["HS256"],
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const catchErrors = (func: (_req: Request, _res: Response) => Promise<void>) => {
    return (req: Request, res: Response): Promise<void> => {
        return func(req, res)
        .catch(e => {
            res.status(500).json(`Some internal issue: ${e}`);
        })
    }
}

app.get("/", (req, res) => res.send("Notes backend alive!"));
app.post("/notes", jwtCheck, catchErrors(createNote));
app.get("/notes/archived", jwtCheck, catchErrors(getArchivedNotes));
app.get("/notes/unarchived", jwtCheck, catchErrors(getUnarchivedNotes));

const server = module.exports = app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

server.on('close', async() => {
  await mongoose.connection.close();
});

module.exports = server;