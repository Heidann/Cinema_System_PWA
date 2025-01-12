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
 * /api/room/get-all-rooms-by-cinema-id:
 *   get:
 *     summary: Retrieve a list of rooms by cinema ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: query
 *         name: cinema_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the cinema
 *     responses:
 *       200:
 *         description: A list of rooms by cinema ID
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
router.get("/get-all-rooms-by-cinema-id", roomController.getAllRoomByCinemaId);

/**
 * @swagger
 * /api/room/{id}:
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
 * /api/room/create:
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
router.post("/create", roomController.createRoom);

/**
 * @swagger
 * /api/room/edit/{id}:
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
router.put("/edit/:id", roomController.updateRoom);

/**
 * @swagger
 * /api/room/delete/{id}:
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
router.delete("/delete/:id", roomController.deleteRoom);

export default router;
