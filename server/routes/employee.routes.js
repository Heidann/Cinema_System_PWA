import { Router } from "express";
import * as employeeController from "../controllers/employee.controller.js";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Employee
 *   description: API for employee management in the system
 */

/**
 * @swagger
 * /api/employee/get-all-employee:
 *   get:
 *     summary: Retrieve a list of employees
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   position:
 *                     type: string
 *                   salary:
 *                     type: number
 */
router.get("/get-all-employee", employeeController.getAllEmployees);

/**
 * @swagger
 * /api/employee/{id}:
 *   get:
 *     summary: Retrieve an employee by id
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: An employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 position:
 *                   type: string
 *                 salary:
 *                   type: number
 *       404:
 *         description: Employee not found
 */
router.get("/get-employee/:id", employeeController.getEmployeeById);

/**
 * @swagger
 * /api/employee/create:
 *   post:
 *     summary: Create a new employee and employee account
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               position:
 *                 type: string
 *               salary:
 *                 type: number
 *               hire_date:
 *                 type: string
 *               username:
 *                type: string
 *               password:
 *                type: string
 *               role:
 *                type: string
 *     responses:
 *       201:
 *         description: The created employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                  type: string
 *                 email:
 *                  type: string
 *                 phone_number:
 *                  type: string
 *                 position:
 *                  type: string
 *                 salary:
 *                  type: number
 *                 hire_date:
 *                  type: string
 *                 username:
 *                  type: string
 *                 password:
 *                  type: string
 *                 role:
 *                  type: string
 *       500:
 *         description: Internal server error
 */
router.post("/create", employeeController.createEmployeeWithAccount);

/**
 * @swagger
 * /api/employee/edit/{id}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               position:
 *                 type: string
 *               salary:
 *                 type: number
 *               hire_date:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               position:
 *                 type: string
 *               salary:
 *                 type: number
 *               hire_date:
 *                 type: string
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.put("/edit/:id", employeeController.updateEmployee);

/**
 * @swagger
 * /api/employee/delete/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", employeeController.deleteEmployee);

/**
 * @swagger
 * /api/employee/accounts:
 *   get:
 *     summary: Retrieve a list of employee accounts
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: A list of employee accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   employee_id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   role:
 *                     type: string
 *                   employee:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       position:
 *                         type: string
 */
router.get("/accounts", employeeController.getAllEmployeeAccounts);

/**
 * @swagger
 * /api/employee/account/{id}:
 *   get:
 *     summary: Retrieve an employee account by id
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee account ID
 *     responses:
 *       200:
 *         description: An employee account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *                 last_login:
 *                   type: string
 *                 employee:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone_number:
 *                       type: string
 *                     position:
 *                       type: string
 *                     salary:
 *                       type: number
 *                     hire_date:
 *                       type: string
 *       404:
 *         description: Employee account not found
 */
router.get("/account/:id", employeeController.getEmployeeAccountById);

// /**
//  * @swagger
//  * /api/employee/account/create-account:
//  *   post:
//  *     summary: Create a new employee account
//  *     tags: [Employee]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               employee_id:
//  *                 type: integer
//  *               username:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *               role:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: The created employee account
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: integer
//  *                 employee_id:
//  *                   type: integer
//  *                 username:
//  *                   type: string
//  *                 password:
//  *                   type: string
//  *                 role:
//  *                   type: string
//  *       500:
//  *         description: Internal server error
//  */
// router.post(
//   "/account/create-account",
//   employeeController.createEmployeeAccount
// );

/**
 * @swagger
 * /api/employee/account/edit-account/{employee_id}:
 *   put:
 *     summary: Update an existing employee account by employee ID
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: employee_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee ID of the account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated employee account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 employee_id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *       404:
 *         description: Employee account not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/account/edit-account/:employee_id",
  employeeController.updateEmployeeAccount
);

/**
 * @swagger
 * /api/employee/account/delete-account/{id}:
 *   delete:
 *     summary: Delete an employee account
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee account ID
 *     responses:
 *       200:
 *         description: Employee account deleted successfully
 *       404:
 *         description: Employee account not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/account/delete-account/:id",
  employeeController.deleteEmployeeAccount
);

export default router;
