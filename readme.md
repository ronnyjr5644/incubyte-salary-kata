# Incubyte Salary Management Kata

A RESTful API built for managing employees, calculating salary deductions, and generating salary metrics.

The application is implemented using Node.js, TypeScript, Express, Prisma ORM, and SQLite.

---

# Tech Stack

* Node.js
* TypeScript
* Express.js
* Prisma ORM
* SQLite
* Jest
* Supertest

---

# Features

## Employee CRUD APIs

* Create Employee
* Get All Employees
* Get Employee By ID
* Update Employee
* Delete Employee

---

## Salary Calculation API

Calculates salary deductions and net salary based on employee country.

### Deduction Rules

| Country         | Deduction |
| --------------- | --------- |
| India           | 10%       |
| United States   | 12%       |
| Other Countries | 0%        |

---

## Salary Metrics APIs

### Country Metrics

Returns:

* Minimum salary
* Maximum salary
* Average salary

### Job Title Metrics

Returns:

* Average salary for a specific job title

---

# Project Setup

## Install Dependencies

```bash
npm install
```

---

## Setup Database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## Run Application

```bash
npm run dev
```

Application runs on:

```text
http://localhost:3000
```

---

## Run Tests

```bash
npm test
```

---

# API Endpoints

## Employee APIs

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| POST   | /employees     | Create employee    |
| GET    | /employees     | Get all employees  |
| GET    | /employees/:id | Get employee by ID |
| PUT    | /employees/:id | Update employee    |
| DELETE | /employees/:id | Delete employee    |

---

## Salary API

| Method | Endpoint              | Description                                |
| ------ | --------------------- | ------------------------------------------ |
| GET    | /employees/:id/salary | Calculate salary deductions and net salary |

---

## Metrics APIs

| Method | Endpoint                     | Description                     |
| ------ | ---------------------------- | ------------------------------- |
| GET    | /metrics/country/:country    | Get salary metrics by country   |
| GET    | /metrics/job-title/:jobTitle | Get average salary by job title |

---

# Sample Employee Payload

```json
{
  "fullName": "Raunak Raj",
  "jobTitle": "Software Engineer",
  "country": "India",
  "salary": 100000
}
```

---

# Sample Salary Response

```json
{
  "grossSalary": 100000,
  "deduction": 10000,
  "netSalary": 90000,
  "country": "India"
}
```

---

# Sample Country Metrics Response

```json
{
  "country": "India",
  "min": 50000,
  "max": 100000,
  "average": 75000
}
```

---

# Testing Approach

This project was developed using strict Test-Driven Development (TDD).

Workflow followed:

1. Write failing test
2. Implement minimal solution
3. Make tests pass
4. Refactor
5. Commit incrementally

The test suite covers:

* CRUD operations
* Salary calculations
* Salary metrics
* Validation scenarios
* Edge cases

---

# Database

SQLite is used as the database and managed using Prisma ORM.

Database file:

```text
prisma/dev.db
```

---

# Implementation Details

AI tools were used minimally for brainstorming project structure, refining test scenarios, and improving documentation. Core implementation, architecture, testing flow, and business logic were implemented manually following TDD practices.

---

# Notes

* This application is backend-only and does not include a UI.
* Tests are executed sequentially to ensure stable SQLite test execution.
* Prisma Studio can be used to inspect the database.

```bash
npx prisma studio
```

---

# Author

Raunak Raj
