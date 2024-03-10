import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const app = express();
dotenv.config();
app.use(express.static("public"));

const PORT = process.env.PORT;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
