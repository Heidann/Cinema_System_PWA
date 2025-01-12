import { Router } from "express";
import * as seatController from "../controllers/seat.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Seats
 *   description: API for seats in the system
 */

/**
 * @swagger
 * /api/seat/get-all-seats:
 *   get:
 *     summary: Retrieve a list of seats by room ID
 *     tags: [Seats]
 *     parameters:
 *      - in: query
 *        name: room_id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The room ID
 *     responses:
 *       200:
 *         description: A list of seats by room ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   room_id:
 *                     type: integer
 *                   seat_number:
 *                     type: string
 *                   is_status:
 *                     type: string
 *                   is_deleted:
 *                     type: boolean
 */
router.get("/get-all-seats", seatController.getAllSeatsByRoomId);

/**
 * @swagger
 * /api/seat/{id}:
 *   get:
 *     summary: Retrieve a seat by id
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The seat ID
 *     responses:
 *       200:
 *         description: A seat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 room_id:
 *                   type: integer
 *                 seat_number:
 *                   type: string
 *                 is_status:
 *                   type: string
 *                 is_deleted:
 *                   type: boolean
 *       404:
 *         description: Seat not found
 */
router.get("/:id", seatController.getSeatById);

/**
 * @swagger
 * /api/seat/create:
 *   post:
 *     summary: Create a new seat
 *     tags: [Seats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_id:
 *                 type: integer
 *               seat_number:
 *                 type: string
 *               is_status:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created seat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 room_id:
 *                   type: integer
 *                 seat_number:
 *                   type: string
 *                 is_status:
 *                   type: string
 *                 is_deleted:
 *                   type: boolean
 *       500:
 *         description: Internal server error
 */
router.post("/create", seatController.createSeat);

/**
 * @swagger
 * /api/seat/edit/{id}:
 *   put:
 *     summary: Update an existing seat
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The seat ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_id:
 *                 type: integer
 *               seat_number:
 *                 type: string
 *               is_status:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated seat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 room_id:
 *                   type: integer
 *                 seat_number:
 *                   type: string
 *                 is_status:
 *                   type: string
 *                 is_deleted:
 *                   type: boolean
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Internal server error
 */
router.put("/edit/:id", seatController.updateSeat);

/**
 * @swagger
 * /api/seat/delete/{id}:
 *   delete:
 *     summary: Delete a seat
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The seat ID
 *     responses:
 *       200:
 *         description: Seat deleted successfully
 *       404:
 *         description: Seat not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", seatController.deleteSeat);

export default router;
