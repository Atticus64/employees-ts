
import assert from "assert";
import { isValidChilds } from "../src/validators/childs"

describe("AgeLimit should return err if age is invalid", () => {

	it("isValidChilds should return err if childs is false and hasChilds is true", async () => {

		const [_errors, hasError] = isValidChilds(true, 0)

		assert.equal(hasError, true)
	}) 

	it("isValidChilds should return err if childs is true and hasChilds false", async () => {

		const [_errors, hasError] = isValidChilds(false, 2)

		assert.equal(hasError, true)
	}) 

	it("isValidChilds should nothing if childs is true and hasChilds true", async () => {

		const [_errors, hasError] = isValidChilds(true, 2)

		assert.equal(hasError, false)
	}) 


});
