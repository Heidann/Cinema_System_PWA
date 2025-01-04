import { Router } from "express";
import * as employeeScheduleController from "../controllers/employee_schedule.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: EmployeeSchedules
 *   description: API for employee schedules in the system
 */

/**
 * @swagger
 * /api/employee-schedules:
 *   get:
 *     summary: Retrieve a list of employee schedules
 *     tags: [EmployeeSchedules]
 *     responses:
 *       200:
 *         description: A list of employee schedules
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
 *                   shift:
 *                     type: string
 *                   date:
 *                     type: string
 */
router.get("/", employeeScheduleController.getAllEmployeeSchedules);

/**
 * @swagger
 * /api/employee-schedules/{id}:
 *   get:
 *     summary: Retrieve an employee schedule by id
 *     tags: [EmployeeSchedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee schedule ID
 *     responses:
 *       200:
 *         description: An employee schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 employee_id:
 *                   type: integer
 *                 shift:
 *                   type: string
 *                 date:
 *                   type: string
 *       404:
 *         description: Employee schedule not found
 */
router.get("/:id", employeeScheduleController.getEmployeeScheduleById);

/**
 * @swagger
 * /api/employee-schedules:
 *   post:
 *     summary: Create a new employee schedule
 *     tags: [EmployeeSchedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *               shift:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created employee schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 employee_id:
 *                   type: integer
 *                 shift:
 *                   type: string
 *                 date:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post("/", employeeScheduleController.createEmployeeSchedule);

/**
 * @swagger
 * /api/employee-schedules/{id}:
 *   put:
 *     summary: Update an existing employee schedule
 *     tags: [EmployeeSchedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee schedule ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *               shift:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated employee schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 employee_id:
 *                   type: integer
 *                 shift:
 *                   type: string
 *                 date:
 *                   type: string
 *       404:
 *         description: Employee schedule not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", employeeScheduleController.updateEmployeeSchedule);

/**
 * @swagger
 * /api/employee-schedules/{id}:
 *   delete:
 *     summary: Delete an employee schedule by id
 *     tags: [EmployeeSchedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee schedule ID
 *     responses:
 *       200:
 *         description: The deleted employee schedule
 *       404:
 *         description: Employee schedule not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", employeeScheduleController.deleteEmployeeSchedule);

export default router;
