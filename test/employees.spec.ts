import request from "supertest";
import assert from "assert"
import app from "../src/app";

describe("GET /api", () => {

  it("should return error if user is younger to 18", async () => {
    const resp = await request(app)
      .post("/api/employees")
      .send({
        names: "Jorge",
        lastnames: "Martinez Gimenez",
        birthDate: "2000/02/12",
        age: 15,
        salary: 12000,
      })
      .expect(400);

			assert.deepEqual(resp.body, {
				"errors": [
					{
						"type": "field",
						"value": "15",
	  				"msg": "Range of age invalid too young to work",
	   			 	"path": "age",
				 		"location": "body"
					}
			]})

  });


})
