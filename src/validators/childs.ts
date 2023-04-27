type errorsArray = { errors?: [{ msg: string }] };

/**
 * Check if properties hasChilds and child are valid
 * @param hasChilds property of Employee if hasChilds
 * @param childs property number of childs
 * @returns [errors, hasError] result of validation
 *
 * Examples
 *
 * ```
 * isValidChilds(false, 0) // correct
 * isValidChilds(true, 2) // correct
 * isValidChilds(true, 0)  // error
 * isValidChilds(true, 0)  // error
 * ```
 */
const isValidChilds = (hasChilds: boolean, childs?: number): [errorsArray, boolean] => {
	let errorsArray: errorsArray = {};
	let hasError = false;

	if (!hasChilds && !childs) {
		return [errorsArray, hasError];
	}

	if (!childs) {
		errorsArray = {
			errors: [{ msg: "Property hasChilds is true but no childs in ths Employee" }],
		};
		hasError = true;

		return [errorsArray, hasError];
	}

	if (!hasChilds && childs > 0) {
		errorsArray = {
			errors: [{ msg: "Property hasChilds is false but youre sending childs number" }],
		};
		hasError = true;
	} else if ((hasChilds && !childs) || childs < 0) {
		errorsArray = {
			errors: [{ msg: "Property hasChilds is true but no childs in ths Employee" }],
		};
		hasError = true;
	}

	return [errorsArray, hasError];
};

export { isValidChilds };
