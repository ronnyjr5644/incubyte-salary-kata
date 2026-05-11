import request from "supertest";
import app from "../../src/app";
import prisma from "../../src/lib/prisma";

beforeEach(async () => {
  await prisma.employee.deleteMany();
});

describe("GET /metrics/job-title/:jobTitle", () => {
  it("should return average salary by job title", async () => {
    await request(app).post("/employees").send({
      fullName: "Employee One",
      jobTitle: "Engineer",
      country: "India",
      salary: 50000,
    });

    await request(app).post("/employees").send({
      fullName: "Employee Two",
      jobTitle: "Engineer",
      country: "United States",
      salary: 100000,
    });

    const response = await request(app).get(
      "/metrics/job-title/Engineer"
    );

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      jobTitle: "Engineer",
      averageSalary: 75000,
    });
  });
});