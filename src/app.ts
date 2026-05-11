import express from "express";

const app = express();

app.use(express.json());

app.post("/employees", (req, res) => {
   const { fullName, jobTitle, country, salary } = req.body;

  if (!fullName || !jobTitle || !country || salary === undefined) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  return res.status(201).json(req.body);
});

export default app;