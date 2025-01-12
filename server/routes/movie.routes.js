import { Router } from "express";
import * as movieController from "../controllers/movie.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API for movies in the system
 */

/**
 * @swagger
 * /api/movie/get-all-movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     tags: [Movies]
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
router.get("/get-all-movies", movieController.getAllMovies);

/**
 * @swagger
 * /api/movie/{id}:
 *   get:
 *     summary: Retrieve a movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: A movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 duration:
 *                   type: integer
 *                 image_url:
 *                   type: string
 *                 trailer_url:
 *                   type: string
 *       404:
 *         description: Movie not found
 */
router.get("/:id", movieController.getMovieById);

/**
 * @swagger
 * /api/movie/create-movie:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: integer
 *               image_url:
 *                 type: string
 *               trailer_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 duration:
 *                   type: integer
 *                 image_url:
 *                   type: string
 *                 trailer_url:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post("/create", movieController.createMovie);

/**
 * @swagger
 * /api/movie/edit/{id}:
 *   put:
 *     summary: Update an existing movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: integer
 *               image_url:
 *                 type: string
 *               trailer_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 duration:
 *                   type: integer
 *                 image_url:
 *                   type: string
 *                 trailer_url:
 *                   type: string
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */
router.put("/edit/:id", movieController.updateMovie);

/**
 * @swagger
 * /api/movie/delete/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", movieController.deleteMovie);

export default router;
