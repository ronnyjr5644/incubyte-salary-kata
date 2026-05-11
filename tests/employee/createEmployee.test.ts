import request from "supertest";
import app from "../../src/app";

describe("POST /employees", () => {
  it("should create an employee", async () => {
    const response = await request(app)
      .post("/employees")
      .send({
        fullName: "Raunak Raj",
        jobTitle: "Software Engineer",
        country: "India",
        salary: 100000,
      });

    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      fullName: "Raunak Raj",
      jobTitle: "Software Engineer",
      country: "India",
      salary: 100000,
    });
  });
  it("should return 400 when required fields are missing", async () => {
  const response = await request(app)
    .post("/employees")
    .send({});

  expect(response.status).toBe(400);

  expect(response.body).toEqual({
    message: "All fields are required",
  });
});
});