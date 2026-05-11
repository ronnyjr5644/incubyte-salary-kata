import request from "supertest";
import app from "../../src/app";

describe("DELETE /employees/:id", () => {
  it("should delete employee", async () => {
    const createResponse = await request(app)
      .post("/employees")
      .send({
        fullName: "Raunak Raj",
        jobTitle: "Software Engineer",
        country: "India",
        salary: 100000,
      });

    const employeeId = createResponse.body.id;

    const response = await request(app).delete(
      `/employees/${employeeId}`
    );

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      message: "Employee deleted successfully",
    });
  });
});