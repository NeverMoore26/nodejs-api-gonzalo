import { Router } from "express";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployee } from "../controllers/employees.controllers.js";

const router = Router();

router.get("/employess", getEmployees);

router.get("/employess/:id", getEmployee);

router.post("/employess", createEmployee);

router.put("/employess", updateEmployee);

router.put("/employess/:id", updateEmployee);

router.delete("/employess", deleteEmployee);

router.delete ("/employess/:id", deleteEmployee);


export default router;

