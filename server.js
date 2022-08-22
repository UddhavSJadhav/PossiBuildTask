import express from "express";
import cors from "cors";
import path from "path";
import uploadroutes from "./main/uploadroutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false, limit: "100mb" }));

app.use("/api/v1", uploadroutes);

const __dirname = path.resolve();

const root = path.join(__dirname, "client", "build");
app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

export default app;
