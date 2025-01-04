import { Router } from "express";
import * as orderItemController from "../controllers/order_item.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: OrderItems
 *   description: API for order items in the system
 */

/**
 * @swagger
 * /api/order-items:
 *   get:
 *     summary: Retrieve a list of order items
 *     tags: [OrderItems]
 *     responses:
 *       200:
 *         description: A list of order items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   order_id:
 *                     type: integer
 *                   product_id:
 *                     type: integer
 *                   quantity:
 *                     type: integer
 */
router.get("/", orderItemController.getAllOrderItems);

/**
 * @swagger
 * /api/order-items/{id}:
 *   get:
 *     summary: Retrieve an order item by id
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order item ID
 *     responses:
 *       200:
 *         description: An order item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 order_id:
 *                   type: integer
 *                 product_id:
 *                   type: integer
 *                 quantity:
 *                   type: integer
 *       404:
 *         description: Order item not found
 */
router.get("/:id", orderItemController.getOrderItemById);

/**
 * @swagger
 * /api/order-items:
 *   post:
 *     summary: Create a new order item
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The created order item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 order_id:
 *                   type: integer
 *                 product_id:
 *                   type: integer
 *                 quantity:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.post("/", orderItemController.createOrderItem);

/**
 * @swagger
 * /api/order-items/{id}:
 *   put:
 *     summary: Update an existing order item
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The updated order item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 order_id:
 *                   type: integer
 *                 product_id:
 *                   type: integer
 *                 quantity:
 *                   type: integer
 *       404:
 *         description: Order item not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", orderItemController.updateOrderItem);

/**
 * @swagger
 * /api/order-items/{id}:
 *   delete:
 *     summary: Delete an order item
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The order item ID
 *     responses:
 *       200:
 *         description: Order item deleted successfully
 *       404:
 *         description: Order item not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", orderItemController.deleteOrderItem);

export default router;
