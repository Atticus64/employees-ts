import { Request, Response } from "express";

import { Employee } from "../models/employee";

const getEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await Employee.find({ active: true });

    res.status(200).send({ employees });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

const root = (_req: Request, res: Response) => {
  return res.status(200).send("data");
};

const createEmployee = async (req: Request, res: Response) => {
  const { names, birthDate, hasChilds, lastnames, childs, age, salary } = req.body;
  let laborer;
  let admissionDate = new Date().toLocaleString()
  if (!hasChilds && childs > 0) {
    res.status(400).json({
      errors: [ { msg:'Property hasChilds is false but youre sending childs number' }]
    })
    return
  } else if (hasChilds && !childs || childs < 0){

    res.status(400).json({
      errors: [ { msg:'Property hasChilds is true but no childs in ths Employee' }]
    })
    return
  }
  if (childs > 0 && hasChilds) {
    laborer = new Employee({
      active: true,
      names,
      lastnames,
      admissionDate,
      age,
      hasChilds,
      childs,
      salary,
      birthDate,
    });
  } else {
    laborer = new Employee({
      active: true,
      names,
      lastnames,
      age,
      admissionDate,
      salary,
      birthDate,
    });
  }

  await laborer.save();

  res.status(201).json(laborer);
};

const updateEmployee = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { _id, active, admissionDate, ...rest } = req.body;

  if (!rest.hasChilds && rest.childs > 0) {
    res.status(400).json({
      errors: [ { msg:'Property hasChilds is false but youre sending childs number' }]
    })
    return
  }

  if (rest.hasChilds && !rest.childs || rest.childs < 0){
    res.status(400).json({
      errors: [ { msg:'Property hasChilds is true but no childs in ths Employee' }]
    })
    return
  }

  const empl = await Employee.findByIdAndUpdate(id, rest);

  res.status(200).json({
    updated: true,
    empl,
  });
};

const deleteEmployee = async (req: Request, res: Response) => {
  const id = req.params.id;

  const employee = await Employee.findByIdAndUpdate(id, { active: false });

  res.status(202).json({
    employee,
    deleted: true,
  });
};

export { createEmployee, deleteEmployee, getEmployees, root, updateEmployee };
