import express from "express";

const app = express();

app.use(express.json());

app.post("/employees", (req, res) => {
  res.status(201).json(req.body);
});

export default app;