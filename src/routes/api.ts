import { Router } from 'express'
import { check } from 'express-validator'
import { createEmployee, deleteEmployee, getEmployees, root, updateEmployee } from '../controllers/api';
import { limitAge } from '../validators/age';
import { validateFields } from '../middlewares/validation';
import { existsEmployeeById } from '../validators/employee';

const apiEndpoints = Router();

apiEndpoints.get("/employees", getEmployees)

apiEndpoints.post("/employees",
  [
    check('age').custom(limitAge),
    check('names', 'Names cannot be empty').not().isEmpty(),
    check('lastnames', 'Lastnames cannot be empty').not().isEmpty(),
    check('names', 'Names length be lower than 100').isLength({ max: 100 }),
    check('lastnames', 'Lastnames length be lower than 100').isLength({ max: 100 }),
    check('salary', 'Salary is required').isInt(),
    check('birthDate', 'BirthDate is required').isString(),
    check('birthDate', 'BirthDate need to be a date').isDate(),
    check('childs', 'Childs must be a number').optional().isInt(),
    check('hasChilds', 'hasChilds must be boolean').optional().isBoolean(),
    validateFields
  ],
  createEmployee)


apiEndpoints.put("/employees/:id",
  [
    check('age').custom(limitAge).optional(),
    check('names', 'Names cannot be empty').not().isEmpty().optional(),
    check('lastnames', 'Lastnames cannot be empty').not().isEmpty().optional(),
    check('names', 'Names length be lower than 100').isLength({ max: 100 }).optional(),
    check('lastnames', 'Lastnames length be lower than 100').isLength({ max: 100 }).optional(),
    check('salary', 'Salary is required').isInt().optional(),
    check('birthDate', 'BirthDate is required').isString().optional(),
    check('birthDate', 'BirthDate need to be a date').isDate().optional(),
    check('childs', 'Childs must be a number').optional().isInt().optional(),
    check('hasChilds', 'hasChilds must be boolean').optional().isBoolean(),
    check('id', 'Id must be the mongo id').isMongoId(),
    check('id',).custom(existsEmployeeById),
    validateFields
  ],
  updateEmployee)

apiEndpoints.delete("/employees/:id", [
  check('id', 'Id must be the mongo id').isMongoId(),
  check('id',).custom(existsEmployeeById),
], deleteEmployee)

apiEndpoints.get("/", root);

export {
  apiEndpoints
}