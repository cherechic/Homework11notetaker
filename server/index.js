const path = require("path");
const express = require("express");
const fs = require("fs").promises;

const app = express();
const port = process.env.PORT || 3000;

const dbFilePath = path.resolve(__dirname, "..", "db", "db.json");

app.use(express.static("public"));

app.get("/", (_, res) => {
  const filePath = path.resolve(__dirname, "..", "public", "index.html");
  res.sendFile(filePath);
});

app.get("/notes", (_, res) => {
  const filePath = path.resolve(__dirname, "..", "public", "notes.html");
  res.sendFile(filePath);
});

app.get("/api/notes", async (_, res) => {
  const fileData = await fs.readFile(dbFilePath, "utf-8");
  const data = JSON.parse(fileData);

  res.json(data);
});

app.post("/api/notes", async (req, res) => {
  const { params } = req;
  console.log(params);

  //const fileData = await fs.readFile(dbFilePath, "utf-8");
  // const data = JSON.parse(fileData);

  // res.json(data);
  res.end();
});

app.get("*", (_, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
