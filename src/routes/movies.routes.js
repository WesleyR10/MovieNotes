const { Router } = require("express")
const moviesRouter = Router()

const MoviesController = require("../controllers/MoviesController")

const moviesController = new MoviesController()

moviesRouter.get("/", moviesController.index)
moviesRouter.get("/:id", moviesController.show)
moviesRouter.post("/:user_id", moviesController.create)
moviesRouter.delete("/:id", moviesController.delete)


module.exports = moviesRouter