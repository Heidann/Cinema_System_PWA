import { Router } from "express";
import * as employeeController from "../controllers/employee.controller.js";
import * as eScheduleController from "../controllers/employee_schedule.controller.js";
import * as eAccountController from "../controllers/employee_account.controller.js";
import validate from "../middlewares/validation.middleware.js";
const router = Router();
import { body, param } from "express-validator";

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
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   position:
 *                     type: string
 *                     example: "manager"
 *                   salary:
 *                     type: number
 *                     example: 50000
 */
router.get("/get-all-employee", employeeController.getAllEmployees);

/**
 * @swagger
 * /api/employee/get-employee/{id}:
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
 *         example: 1
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
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 position:
 *                   type: string
 *                   example: "manager"
 *                 salary:
 *                   type: number
 *                   example: 50000
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
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *               cccd:
 *                 type: string
 *                 example: "123456789"
 *               phone_number:
 *                 type: string
 *                 example: "123-456-7890"
 *               position:
 *                 type: string
 *                 example: "manager"
 *               salary:
 *                 type: number
 *                 example: 50000
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 example: "admin"
 *               cinema_id:
 *                 type: integer
 *                 example: 1
 *               sex:
 *                 type: string
 *                 example: "male"
 *               city_cinema:
 *                 type: string
 *                 example: "New York"
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
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *                 address:
 *                   type: string
 *                   example: "123 Main St"
 *                 cccd:
 *                   type: string
 *                   example: "123456789"
 *                 phone_number:
 *                   type: string
 *                   example: "123-456-7890"
 *                 position:
 *                   type: string
 *                   example: "manager"
 *                 salary:
 *                   type: number
 *                   example: 50000
 *                 username:
 *                   type: string
 *                   example: "johndoe"
 *                 password:
 *                   type: string
 *                   example: "password123"
 *                 role:
 *                   type: string
 *                   example: "admin"
 *                 cinema_id:
 *                   type: integer
 *                   example: 1
 *                 sex:
 *                   type: string
 *                   example: "male"
 *                 city_cinema:
 *                   type: string
 *                   example: "New York"
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
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *               sex:
 *                 type: string
 *                 example: "male"
 *               cccd:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: The updated employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 address:
 *                   type: string
 *                   example: "123 Main St"
 *                 sex:
 *                   type: string
 *                   example: "male"
 *                 cccd:
 *                   type: string
 *                   example: "123456789"
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
 *         example: 1
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
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: "johndoe"
 *                   role:
 *                     type: string
 *                     example: "admin"
 *                   employee:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       position:
 *                         type: string
 *                         example: "manager"
 */
router.get("/accounts", eAccountController.getAllEmployeeAccounts);

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
 *         example: 1
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
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "johndoe"
 *                 role:
 *                   type: string
 *                   example: "admin"
 *                 last_login:
 *                   type: string
 *                   example: "2023-10-01T12:00:00Z"
 *                 employee:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     phone_number:
 *                       type: string
 *                       example: "123-456-7890"
 *                     position:
 *                       type: string
 *                       example: "manager"
 *                     salary:
 *                       type: number
 *                       example: 50000
 *                     hire_date:
 *                       type: string
 *                       example: "2023-01-01"
 *       404:
 *         description: Employee account not found
 */
router.get("/account/:id", eAccountController.getEmployeeAccountById);

/**
 * @swagger
 * /api/employee/account/create-account:
 *   post:
 *     summary: Create a new employee account
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *                 example: 1
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 example: "admin"
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
 *                   example: 1
 *                 employee_id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "johndoe"
 *                 password:
 *                   type: string
 *                   example: "password123"
 *                 role:
 *                   type: string
 *                   example: "admin"
 *       500:
 *         description: Internal server error
 */
router.post(
  "/account/create-account",
  eAccountController.createEmployeeAccount
);

/**
 * @swagger
 * /api/employee/account/change-password:
 *   put:
 *     summary: Change the password of an employee account by username
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               oldPassword:
 *                 type: string
 *                 example: "oldpassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
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
 *                   example: 1
 *                 employee_id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "johndoe"
 *                 role:
 *                   type: string
 *                   example: "admin"
 *       404:
 *         description: Employee account not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/account/change-password",
  eAccountController.updateEmployeePassword
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
 *         example: 1
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
  eAccountController.deleteEmployeeAccount
);

/**
 * @swagger
 * /api/employee/account/login:
 *   post:
 *     summary: Login an employee account
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials
 */
router.post("/account/login", eAccountController.loginEmployeeAccount);

/**
 * @swagger
 * /api/employee/account/lock-account/{id}:
 *   put:
 *     summary: Lock an employee account by ID
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee account ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Employee account locked successfully
 *       404:
 *         description: Employee account not found
 *       500:
 *         description: Internal server error
 */
router.put("/account/lock-account/:id", eAccountController.lockEmployeeAccount);

//==========Employee Schedule Management==========

/**
 * @swagger
 * /api/employee/schedules:
 *   get:
 *     summary: Retrieve a list of employee schedules
 *     tags: [Employee]
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
 *                     example: 1
 *                   employee_id:
 *                     type: integer
 *                     example: 1
 *                   work_date:
 *                     type: string
 *                     format: date
 *                     example: "2025-02-19"
 *                   start_time:
 *                     type: string
 *                     format: time
 *                     example: "09:00:00"
 *                   end_time:
 *                     type: string
 *                     format: time
 *                     example: "17:00:00"
 *                   notes:
 *                     type: string
 *                     example: "Meeting with the team"
 *                   is_status:
 *                     type: string
 *                     example: "scheduled"
 *                   is_deleted:
 *                     type: boolean
 *                     example: false
 */
router.get("/schedules", eScheduleController.getEmployeeSchedules);

/**
 * @swagger
 * /api/employee/schedules/{id}:
 *   get:
 *     summary: Retrieve an employee schedule by id
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee schedule ID
 *         example: 1
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
 *                   example: 1
 *                 employee_id:
 *                   type: integer
 *                   example: 1
 *                 work_date:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-19"
 *                 start_time:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
 *                 end_time:
 *                   type: string
 *                   format: time
 *                   example: "17:00:00"
 *                 notes:
 *                   type: string
 *                   example: "Meeting with the team"
 *                 is_status:
 *                   type: string
 *                   example: "scheduled"
 *                 is_deleted:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Employee schedule not found
 *       500:
 *         description: Internal server error
 */
router.get("/schedules/:id", eScheduleController.getEmployeeScheduleById);

/**
 * @swagger
 * /api/employee/schedules/{id}:
 *   put:
 *     summary: Update an employee schedule
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee schedule ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               work_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-19"
 *               start_time:
 *                 type: string
 *                 format: time
 *                 example: "09:00:00"
 *               end_time:
 *                 type: string
 *                 format: time
 *                 example: "17:00:00"
 *               notes:
 *                 type: string
 *                 example: "Meeting with the team"
 *               is_status:
 *                 type: string
 *                 example: "scheduled"
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
 *                   example: 1
 *                 employee_id:
 *                   type: integer
 *                   example: 1
 *                 work_date:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-19"
 *                 start_time:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
 *                 end_time:
 *                   type: string
 *                   format: time
 *                   example: "17:00:00"
 *                 notes:
 *                   type: string
 *                   example: "Meeting with the team"
 *                 is_status:
 *                   type: string
 *                   example: "scheduled"
 *                 is_deleted:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Employee schedule not found
 *       500:
 *         description: Internal server error
 */
router.put("/schedules/:id", eScheduleController.updateEmployeeSchedule);

/**
 * @swagger
 * /api/employee/schedules:
 *   post:
 *     summary: Create a new employee schedule
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *                 example: 1
 *               work_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-19"
 *               start_time:
 *                 type: string
 *                 format: time
 *                 example: "09:00:00"
 *               end_time:
 *                 type: string
 *                 format: time
 *                 example: "17:00:00"
 *               notes:
 *                 type: string
 *                 example: "Meeting with the team"
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
 *                   example: 1
 *                 employee_id:
 *                   type: integer
 *                   example: 1
 *                 work_date:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-19"
 *                 start_time:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
 *                 end_time:
 *                   type: string
 *                   format: time
 *                   example: "17:00:00"
 *                 notes:
 *                   type: string
 *                   example: "Meeting with the team"
 *                 is_status:
 *                   type: string
 *                   example: "scheduled"
 *                 is_deleted:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error
 */
router.post(
  "/schedules",
  eScheduleController.validateEmployeeSchedule,
  validate,
  eScheduleController.createEmployeeSchedule
);

/**
 * @swagger
 * /api/employee/schedules/{id}:
 *   delete:
 *     summary: Delete an employee schedule
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The employee schedule ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Employee schedule deleted successfully
 *       404:
 *         description: Employee schedule not found
 *       500:
 *         description: Internal server error
 */
router.delete("/schedules/:id", eScheduleController.deleteEmployeeSchedule);

//==========Employee Salary Management==========
// Xem bảng lương nhân viên	GET	/api/admin/employees/salaries	Xem danh sách bảng lương nhân viên.
// Xem chi tiết lương nhân viên	GET	/api/admin/employees/salaries/:id	Xem chi tiết lương nhân viên theo ID.
// Tạo bảng lương nhân viên	POST	/api/admin/employees/salaries	Tạo bảng lương mới cho nhân viên.
// Cập nhật lương nhân viên	PUT	/api/admin/employees/salaries/:id	Cập nhật lương, thưởng, khấu trừ.
// Thanh toán lương nhân viên	PUT	/api/admin/employees/salaries/:id/pay	Đánh dấu lương nhân viên đã được thanh toán.
export default router;
