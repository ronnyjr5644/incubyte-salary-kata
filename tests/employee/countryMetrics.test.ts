import request from "supertest";
import app from "../../src/app";

describe("GET /metrics/country/:country", () => {
  it("should return salary metrics for a country", async () => {
    await request(app).post("/employees").send({
      fullName: "Employee One",
      jobTitle: "Engineer",
      country: "India",
      salary: 50000,
    });

    await request(app).post("/employees").send({
      fullName: "Employee Two",
      jobTitle: "Engineer",
      country: "India",
      salary: 100000,
    });

    const response = await request(app).get(
      "/metrics/country/India"
    );

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      country: "India",
      min: 50000,
      max: 100000,
      average: 75000,
    });
  });
});