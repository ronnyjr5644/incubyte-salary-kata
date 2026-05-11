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
});