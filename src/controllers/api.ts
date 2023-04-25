import { Application, Request, Response } from "express";
import { Employee } from "../models/employee";

const getEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await Employee.find({ active: true })

    res.status(200).send({ employees })

  } catch (err) {
    console.log(err)
    res.status(500).send('Server error')
  }
}

const root = (req: Request, res: Response) => {
  return res.status(200).send('data');
}

const createEmployee = async (req: Request, res: Response) => {
  const { names, birthDate, lastnames, age, salary } = req.body
  const laborer = new Employee({
    active: true,
    names,
    lastnames,
    age,
    salary,
    birthDate
  })

  await laborer.save()

  res.status(201).json(laborer)
}

const updateEmployee = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { _id, active, ...rest } = req.body

  const empl = await Employee.findByIdAndUpdate(id, rest)

  res.status(200).json({
    updated: true,
    empl
  })
}

const deleteEmployee = async (req: Request, res: Response) => {
  const id = req.params.id;

  const employee = await Employee.findByIdAndUpdate(id, { active: false })

  res.status(202).json({
    employee,
    deleted: true
  })

}

export {
  createEmployee,
  root,
  updateEmployee,
  getEmployees,
  deleteEmployee
}