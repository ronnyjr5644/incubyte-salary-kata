import request from "supertest";
import app from "../../src/app";

describe("GET /employees", () => {
  it("should return all employees", async () => {
    await request(app).post("/employees").send({
      fullName: "Raunak Raj",
      jobTitle: "Software Engineer",
      country: "India",
      salary: 100000,
    });

    const response = await request(app).get("/employees");

    expect(response.status).toBe(200);

    expect(response.body.length).toBeGreaterThan(0);
  });
});