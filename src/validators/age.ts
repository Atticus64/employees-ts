/**
 * Check if age is valid for a Employee
 * @param age Age of Employee
 *
 * Examples
 *
 *
 * ```
 * limitAge(18)  // correct
 * limitAge(59)  // correct
 * limitAge(60)  // error
 * limitAge(10)  // error
 * limitAge(100) // error
 * ```
 */
const limitAge = async (age: number): Promise<void> => {
	if (age < 18) {
		throw new Error("Range of age invalid too young to work");
	} else if (age >= 60) {
		throw new Error("Range of age invalid too old to work");
	}
};

export { limitAge };
