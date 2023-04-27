import { Router } from "express";
import { check } from "express-validator";

import {
	createEmployee,
	deleteEmployee,
	getEmployees,
	root,
	updateEmployee,
} from "../controllers/api";
import { validateFields } from "../middlewares/validation";
import { limitAge } from "../validators/age";
import { existsEmployeeById } from "../validators/employee";
import { isValidSalary } from "../validators/salary";
import { isValidDate } from "../validators/date";

const apiEndpoints = Router();

apiEndpoints.get("/employees", getEmployees);

apiEndpoints.post(
	"/employees",
	[
		check("age").custom(limitAge),
		check("names", "Names cannot be empty").not().isEmpty(),
		check("lastnames", "Lastnames cannot be empty").not().isEmpty(),
		check("names", "Names length be lower than 100").isLength({ max: 100 }),
		check("lastnames", "Lastnames length be lower than 100").isLength({ max: 100 }),
		check("names", "Names length need to be 4 characters or more").isLength({ min: 4 }).optional(),
		check("names", "Lastnames length need to be 4 characters or more").isLength({ min: 4 }).optional(),
		check("salary", "Salary is required").isInt(),
		check("salary").custom(isValidSalary),
		check("birthDate", "BirthDate is required").isString(),
		check("birthDate", "BirthDate need to be a date").isDate(),
		check("birthDate").custom(isValidDate),
		check("childs", "Childs must be a number").optional().isInt(),
		check("hasChilds", "hasChilds must be boolean").optional().isBoolean(),
		validateFields,
	],
	createEmployee
);

apiEndpoints.put(
	"/employees/:id",
	[
		check("age").custom(limitAge).optional(),
		check("names", "Names cannot be empty").not().isEmpty().optional(),
		check("lastnames", "Lastnames cannot be empty").not().isEmpty().optional(),
		check("names", "Names length be lower than 100").isLength({ max: 100 }).optional(),
		check("names", "Names length need to be 4 characters or more").isLength({ min: 4 }).optional(),
		check("names", "Lastnames length need to be 4 characters or more").isLength({ min: 4 }).optional(),
		check("lastnames", "Lastnames length be lower than 100")
			.isLength({ max: 100 })
			.optional(),
		check("salary", "Salary is required").isInt().optional(),
		check("salary").custom(isValidSalary),
		check("birthDate", "BirthDate is required").isString().optional(),
		check("birthDate", "BirthDate need to be a date").isDate().optional(),
		check("birthDate").custom(isValidDate),
		check("childs", "Childs must be a number").optional().isInt().optional(),
		check("hasChilds", "hasChilds must be boolean").optional().isBoolean(),
		check("id", "Id must be the mongo id").isMongoId(),
		check("id").custom(existsEmployeeById),
		validateFields,
	],
	updateEmployee
);

apiEndpoints.delete(
	"/employees/:id",
	[check("id", "Id must be the mongo id").isMongoId(), check("id").custom(existsEmployeeById)],
	deleteEmployee
);

apiEndpoints.get("/", root);

export { apiEndpoints };
