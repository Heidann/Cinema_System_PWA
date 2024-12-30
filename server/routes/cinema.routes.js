import { Router } from "express";
import * as cinemaController from "../controllers/cinema.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cinemas
 *   description: API for cinemas in the system
 */

/**
 * @swagger
 * /api/cinemas:
 *   get:
 *     summary: Retrieve a list of cinemas
 *     tags: [Cinemas]
 *     responses:
 *       200:
 *         description: A list of cinemas
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
 *                   city:
 *                     type: string
 *                   address:
 *                     type: string
 *                   is_deleted:
 *                     type: boolean
 */
router.get("/", cinemaController.getAllCinemas);

/**
 * @swagger
 * /api/cinemas/{id}:
 *   get:
 *     summary: Retrieve a cinema by id
 *     tags: [Cinemas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The cinema ID
 *     responses:
 *       200:
 *         description: A cinema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 city:
 *                   type: string
 *                 address:
 *                   type: string
 *                 is_deleted:
 *                   type: boolean
 *       404:
 *         description: Cinema not found
 */
router.get("/:id", cinemaController.getCinemaById);

/**
 * @swagger
 * /api/cinemas:
 *   post:
 *     summary: Create a new cinema
 *     tags: [Cinemas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created cinema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 city:
 *                   type: string
 *                 address:
 *                   type: string
 *                 is_deleted:
 *                   type: boolean
 *       500:
 *         description: Internal server error
 */
router.post("/", cinemaController.createCinema);

/**
 * @swagger
 * /api/cinemas/{id}:
 *   put:
 *     summary: Update an existing cinema
 *     tags: [Cinemas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The cinema ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: The updated cinema
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 city:
 *                   type: string
 *                 address:
 *                   type: string
 *
 *       404:
 *         description: Cinema not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", cinemaController.updateCinema);

/**
 * @swagger
 * /api/cinemas/{id}:
 *   delete:
 *     summary: Delete a cinema
 *     tags: [Cinemas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The cinema ID
 *     responses:
 *       200:
 *         description: Cinema deleted successfully
 *       404:
 *         description: Cinema not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", cinemaController.deleteCinema);

export default router;
