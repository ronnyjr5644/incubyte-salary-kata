import request from "supertest";
import app from "../../src/app";

describe("GET /employees/:id", () => {
  it("should return employee by id", async () => {
    const createResponse = await request(app)
      .post("/employees")
      .send({
        fullName: "Raunak Raj",
        jobTitle: "Software Engineer",
        country: "India",
        salary: 100000,
      });

    const employeeId = createResponse.body.id;

    const response = await request(app).get(`/employees/${employeeId}`);

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      id: employeeId,
      fullName: "Raunak Raj",
    });
  });
});