const { Router } = require("express")
const moviesRouter = Router()

const MoviesController = require("../controllers/MoviesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const moviesController = new MoviesController()

moviesRouter.use(ensureAuthenticated) // aplicando o middleware para todas as rotas abaixo

moviesRouter.get("/", moviesController.index)
moviesRouter.post("/", moviesController.create)
moviesRouter.get("/:id", moviesController.show)
moviesRouter.delete("/:id", moviesController.delete)


module.exports = moviesRouter