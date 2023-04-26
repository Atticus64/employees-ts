import assert from "assert";
import { limitAge } from "../src/validators/age"

describe("AgeLimit should return err if age is invalid", () => {

	it("ageLimit should return err if age is youger than 18", async () => {

	  await assert.rejects(async () => await limitAge(17))
	}) 

	it("ageLimit shoul return nothing if age is 18 or lower 60", async () => {

		await assert.doesNotReject(async () => await limitAge(20))

	})

});
