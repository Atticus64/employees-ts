
import { Employee } from '../models/employee';


const existsEmployeeById = async (id = '') => {
  const existUser = await Employee.findById(id);

  if (!existUser) {
    throw new Error(`El id ${id} no existe`);
  }

  if (!existUser.active) {
    throw new Error(`El Employee con el id ${id} no esta activo`);
  }
}

export {
  existsEmployeeById
}