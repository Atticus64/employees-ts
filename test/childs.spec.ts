import assert from "assert";

import { isValidChilds } from "../src/validators/childs";

describe("AgeLimit should return err if age is invalid", () => {
	it("isValidChilds should return err if childs is false and hasChilds is true", async () => {
		const [errors, hasError] = isValidChilds(true, 0);

		assert.deepEqual(errors, {
			errors: [
				{ msg: "Property hasChilds is true but no childs in ths Employee" }
			]
		})
		assert.equal(hasError, true);
	});

	it("isValidChilds should return err if childs is true and hasChilds false", async () => {
		const [errors, hasError] = isValidChilds(false, 2);

		assert.deepEqual(errors, {
			errors: [
				{ msg: "Property hasChilds is false but youre sending childs number" }
			]
		})

		assert.equal(hasError, true);
	});

	it("isValidChilds should nothing if childs is true and hasChilds true", async () => {
		const [errors, hasError] = isValidChilds(true, 2);

		assert.deepEqual(errors, {})
		assert.equal(hasError, false);
	});
});
