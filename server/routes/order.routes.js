import { Router } from "express";
import * as orderController from "../controllers/order.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for orders in the system
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve a list of orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   total_price:
 *                     type: number
 *                   status:
 *                     type: string
 */
router.get("/", orderController.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Retrieve an order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order ID
 *     responses:
 *       200:
 *         description: An order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 total_price:
 *                   type: number
 *                 status:
 *                   type: string
 *       404:
 *         description: Order not found
 */
router.get("/:id", orderController.getOrderById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               total_price:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 total_price:
 *                   type: number
 *                 status:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post("/", orderController.createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", orderController.deleteOrder);

export default router;
