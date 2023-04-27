import { Employee } from "../models/employee";

/**
 *
 * @param id Id of a Employee
 * @returns {void}
 */
const existsEmployeeById = async (id = ""): Promise<void> => {
	const existUser = await Employee.findById(id);

	if (!existUser) {
		throw new Error(`El id ${id} no existe`);
	}

	if (!existUser.active) {
		throw new Error(`El Employee con el id ${id} no esta activo`);
	}
};

export { existsEmployeeById };
