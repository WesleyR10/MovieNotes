const { Router } = require("express")
const moviesRouter = Router()

const MoviesController = require("../controllers/MoviesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const moviesController = new MoviesController()

moviesRouter.use(ensureAuthenticated) // aplicando o middleware para todas as rotas abaixo

moviesRouter.get("/", moviesController.index)
moviesRouter.get("/:id", moviesController.show)
moviesRouter.post("/:user_id", moviesController.create)
moviesRouter.delete("/:id", moviesController.delete)


module.exports = moviesRouter