import assert from "assert";
import request from "supertest";

import app from "../src/app";
import { Employee } from "../src/models/employee";

describe("GET /api", () => {
  it("should return 200 OK", async () => {
    await request(app).get("/api").expect(200);
  });
  it("should return / array or employees", async () => {
    const data = await request(app).get("/api/employees").expect(200);

    assert(Array.isArray(data.body.employees));
  });
  it("should post create a Employee", async () => {
    const { body } = await request(app)
      .post("/api/employees")
      .send({
        names: "Jorge",
        lastnames: "Martinez Gimenez",
        birthDate: "2000/02/12",
        age: 23,
        salary: 12000,
      })
      .expect(201);

    const id = body.uid;

    assert.equal(body.names, "Jorge");
    assert.equal(body.lastnames, "Martinez Gimenez");
    assert.equal(body.birthDate, "2000/02/12");
    assert.equal(body.age, 23);
    assert.equal(body.salary, 12000);

    await Employee.findByIdAndDelete(id);
  });

  it("Should delete change the state of the Employee active to false", async () => {
    const { body } = await request(app)
      .post("/api/employees")
      .send({
        names: "Bruno",
        lastnames: "Díaz",
        birthDate: "1995/02/12",
        age: 45,
        salary: 100000,
      })
      .expect(201);

    const id = body.uid;

    const resp = await request(app).delete(`/api/employees/${id}`).expect(202);

    assert.equal(resp.body.deleted, true);

    const r = await Employee.findById(id);

    assert.equal(r?.active, false);

    await Employee.findByIdAndDelete(id);
  });
});
