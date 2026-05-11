import request from "supertest";
import app from "../../src/app";

describe("PUT /employees/:id", () => {
  it("should update employee details", async () => {
    const createResponse = await request(app)
      .post("/employees")
      .send({
        fullName: "Raunak Raj",
        jobTitle: "Software Engineer",
        country: "India",
        salary: 100000,
      });

    const employeeId = createResponse.body.id;

    const response = await request(app)
      .put(`/employees/${employeeId}`)
      .send({
        fullName: "Raunak Updated",
        jobTitle: "Senior Engineer",
        country: "India",
        salary: 150000,
      });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      fullName: "Raunak Updated",
      jobTitle: "Senior Engineer",
      salary: 150000,
    });
  });
});