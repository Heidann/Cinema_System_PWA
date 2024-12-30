import { Router } from "express";
import * as movieController from "../controllers/movie.controller.js";

const router = Router();

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   duration:
 *                     type: integer
 *                   image_url:
 *                     type: string
 *                   trailer_url:
 *                     type: string
 */
router.get("/", movieController.getAllMovies);

export default router;
