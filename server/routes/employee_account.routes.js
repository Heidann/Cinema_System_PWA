import { Router } from "express";
import * as employeeAccountController from "../controllers/employee_account.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: EmployeeAccount
 *   description: API for employee accounts in the system
 */

/**
 * @swagger
 * /api/employee-account:
 *   get:
 *     summary: Retrieve a list of employee accounts
 *     tags: [EmployeeAccount]
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
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   password:
 *                     type: string
 *                   role:
 *                    type: string
 */
router.get("/", employeeAccountController.getAllEmployeeAccounts);

/**
 * @swagger
 * /api/employee-account/{id}:
 *   get:
 *     summary: Retrieve an employee account by id
 *     tags: [EmployeeAccount]
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
 *                 employee_id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *       404:
 *         description: Employee account not found
 */
router.get("/:id", employeeAccountController.getEmployeeAccountById);

/**
 * @swagger
 * /api/employee-account:
 *   post:
 *     summary: Create a new employee account
 *     tags: [EmployeeAccount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created employee account
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
 *                 password:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post("/", employeeAccountController.createEmployeeAccount);

/**
 * @swagger
 * /api/employee-account/{id}:
 *   put:
 *     summary: Update an existing employee account
 *     tags: [EmployeeAccount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *               username:
 *                 type: string
 *               password:
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
 *                 password:
 *                   type: string
 *       404:
 *         description: Employee account not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", employeeAccountController.updateEmployeeAccount);

/**
 * @swagger
 * /api/employee-account/{id}:
 *   delete:
 *     summary: Delete an employee account
 *     tags: [EmployeeAccount]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee account ID
 *     responses:
 *       200:
 *         description: The deleted employee account
 *       404:
 *         description: Employee account not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", employeeAccountController.deleteEmployeeAccount);

export default router;
