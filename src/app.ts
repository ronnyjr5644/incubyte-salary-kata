import express from "express";
import prisma from "./lib/prisma";

const app = express();

app.use(express.json());

app.get("/employees", async (_req, res) => {
  const employees = await prisma.employee.findMany();

  return res.status(200).json(employees);
});

app.get("/employees/:id", async (req, res) => {
  const employee = await prisma.employee.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!employee) {
    return res.status(404).json({
      message: "Employee not found",
    });
  }

  return res.status(200).json(employee);
});

app.put("/employees/:id", async (req, res) => {
  const { fullName, jobTitle, country, salary } = req.body;

  const existingEmployee = await prisma.employee.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!existingEmployee) {
    return res.status(404).json({
      message: "Employee not found",
    });
  }

  const updatedEmployee = await prisma.employee.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      fullName,
      jobTitle,
      country,
      salary,
    },
  });

  return res.status(200).json(updatedEmployee);
});

app.delete("/employees/:id", async (req, res) => {
  const employee = await prisma.employee.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!employee) {
    return res.status(404).json({
      message: "Employee not found",
    });
  }

  await prisma.employee.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  return res.status(200).json({
    message: "Employee deleted successfully",
  });
});

app.get("/employees/:id/salary", async (req, res) => {
  const employee = await prisma.employee.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!employee) {
    return res.status(404).json({
      message: "Employee not found",
    });
  }

  let deduction = 0;

  if (employee.country === "India") {
    deduction = employee.salary * 0.1;
  } else if (employee.country === "United States") {
    deduction = employee.salary * 0.12;
  }

  const netSalary = employee.salary - deduction;

  return res.status(200).json({
    grossSalary: employee.salary,
    deduction,
    netSalary,
    country: employee.country,
  });
});

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