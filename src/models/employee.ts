import { model, Schema } from "mongoose";

const EmployeeSchema = new Schema({
	names: {
		type: String,
		required: [true, "The names is a required field"],
	},
	lastnames: {
		type: String,
		required: [true, "The names is a required field"],
	},
	age: {
		type: Number,
		required: [true, "The age is a required field"],
	},
	hasChilds: {
		type: Boolean,
		default: false,
		required: false,
	},
	childs: {
		type: Number,
		required: false,
	},
	birthDate: {
		type: String,
		required: true,
	},
	admissionDate: {
		type: String,
		required: true,
	},
	active: {
		type: Boolean,
		default: true,
	},
	salary: {
		type: Number,
		required: [true, "The salary is a required field"],
	},
});

EmployeeSchema.methods.toJSON = function () {
	const { __v, password, _id, ...usuario } = this.toObject();
	usuario.uid = _id;

	return usuario;
};

const Employee = model("Employee", EmployeeSchema);

export { Employee };
