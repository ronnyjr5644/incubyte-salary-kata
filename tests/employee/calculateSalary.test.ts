import request from "supertest";
import app from "../../src/app";

describe("GET /employees/:id/salary", () => {
  it("should calculate salary deductions for India", async () => {
    const createResponse = await request(app)
      .post("/employees")
      .send({
        fullName: "Raunak Raj",
        jobTitle: "Software Engineer",
        country: "India",
        salary: 100000,
      });

    const employeeId = createResponse.body.id;

    const response = await request(app).get(
      `/employees/${employeeId}/salary`
    );

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      grossSalary: 100000,
      deduction: 10000,
      netSalary: 90000,
      country: "India",
    });
  });
  it("should return zero deduction for unsupported countries", async () => {
  const createResponse = await request(app)
    .post("/employees")
    .send({
      fullName: "John Doe",
      jobTitle: "Designer",
      country: "Canada",
      salary: 80000,
    });

  const employeeId = createResponse.body.id;

  const response = await request(app).get(
    `/employees/${employeeId}/salary`
  );

  expect(response.status).toBe(200);

  expect(response.body).toEqual({
    grossSalary: 80000,
    deduction: 0,
    netSalary: 80000,
    country: "Canada",
  });
});
it("should return 404 for non-existing employee", async () => {
  const response = await request(app).get(
    "/employees/99999/salary"
  );

  expect(response.status).toBe(404);

  expect(response.body).toEqual({
    message: "Employee not found",
  });
});
});