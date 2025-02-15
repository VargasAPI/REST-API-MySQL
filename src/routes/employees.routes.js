//Permite agrupar un sistema de rutas
import { Router } from "express";
import {getEmployees, createEmployees, updateEmployees, deleteEmployees, getEmployee} from '../controllers/employees.controlers.js'

const router = Router()

router.get('/employees', getEmployees)

router.get('/employees/:id', getEmployee) // This is call parameter '/employees/:id'

router.post('/employees', createEmployees )

router.patch('/employees/:id', updateEmployees) //// Allow partial data updates with PATCH


router.delete('/employees/:id', deleteEmployees )












//exportamos
export default router