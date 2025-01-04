import { Router } from "express";
import * as employeeSalaryController from "../controllers/employee_salary.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: EmployeeSalaries
 *   description: API for employee salaries in the system
 */

/**
 * @swagger
 * /api/employee-salaries:
 *   get:
 *     summary: Retrieve a list of employee salaries
 *     tags: [EmployeeSalaries]
 *     responses:
 *       200:
 *         description: A list of employee salaries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   employee_id:
 *                     type: integer
 *                   amount:
 *                     type: number
 *                   date:
 *                     type: string
 */
router.get("/", employeeSalaryController.getAllEmployeeSalaries);

/**
 * @swagger
 * /api/employee-salaries/{id}:
 *   get:
 *     summary: Retrieve an employee salary by id
 *     tags: [EmployeeSalaries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee salary ID
 *     responses:
 *       200:
 *         description: An employee salary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 employee_id:
 *                   type: integer
 *                 amount:
 *                   type: number
 *                 date:
 *                   type: string
 *       404:
 *         description: Employee salary not found
 */
router.get("/:id", employeeSalaryController.getEmployeeSalaryById);

/**
 * @swagger
 * /api/employee-salaries:
 *   post:
 *     summary: Create a new employee salary
 *     tags: [EmployeeSalaries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created employee salary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 employee_id:
 *                   type: integer
 *                 amount:
 *                   type: number
 *                 date:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post("/", employeeSalaryController.createEmployeeSalary);

/**
 * @swagger
 * /api/employee-salaries/{id}:
 *   put:
 *     summary: Update an existing employee salary
 *     tags: [EmployeeSalaries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee salary ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated employee salary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 employee_id:
 *                   type: integer
 *                 amount:
 *                   type: number
 *                 date:
 *                   type: string
 *       404:
 *         description: Employee salary not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", employeeSalaryController.updateEmployeeSalary);

/**
 * @swagger
 * /api/employee-salaries/{id}:
 *   delete:
 *     summary: Delete an employee salary by id
 *     tags: [EmployeeSalaries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee salary ID
 *     responses:
 *       200:
 *         description: Employee salary deleted successfully
 *       404:
 *         description: Employee salary not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", employeeSalaryController.deleteEmployeeSalary);

export default router;
