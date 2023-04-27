/**
 * @param salary Salary of Employee
 *
 *
 * Examples
 *
 * ```
 * isValidSalary(10)       // correct
 * isValidSalary(10000)    // correct
 * isValidSalary(0)        // error
 * isValidSalary(-10)      // error
 * isValidSalary(10000000) // error
 * ```
 */
const isValidSalary = async (salary: number): Promise<void> => {
	if (salary < 0) {
		throw new Error("Salary must be greater than zero or positive");
	} else if (salary > 1000000) {
		throw new Error("Salary cannot be greater than 10000000");
	}
};

export { isValidSalary };
