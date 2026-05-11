import express from "express";
import prisma from "./lib/prisma";

const app = express();

app.use(express.json());

app.post("/employees",async (req, res) => {
   const { fullName, jobTitle, country, salary } = req.body;

  if (!fullName || !jobTitle || !country || salary === undefined) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  if (salary <= 0) {
  return res.status(400).json({
    message: "Salary must be greater than 0",
  });
}

   const employee = await prisma.employee.create({
    data: {
      fullName,
      jobTitle,
      country,
      salary,
    },
  });

  return res.status(201).json(employee);
});

export default app;