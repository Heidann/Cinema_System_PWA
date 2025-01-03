import { Router } from "express";
import * as roomController from "../controllers/room.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: API for rooms in the system
 */

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Retrieve a list of rooms by cinema ID
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cinemaId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: A list of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   cinema_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   capacity:
 *                     type: integer
 *                   is_deleted:
 *                     type: boolean
 */
router.get("/", roomController.getAllRoomByCinemaId);

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Retrieve a room by id
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The room ID
 *     responses:
 *       200:
 *         description: A room
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 cinema_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 capacity:
 *                   type: integer
 *                 is_deleted:
 *                   type: boolean
 *       404:
 *         description: Room not found
 */
router.get("/:id", roomController.getRoomById);

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cinema_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The created room
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 cinema_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 capacity:
 *                   type: integer
 *                 is_deleted:
 *                   type: boolean
 *       500:
 *         description: Internal server error
 */
router.post("/", roomController.createRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Update an existing room
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The updated room
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 cinema_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 capacity:
 *                   type: integer
 *                 is_deleted:
 *                   type: boolean
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", roomController.updateRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The room ID
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", roomController.deleteRoom);

export default router;
