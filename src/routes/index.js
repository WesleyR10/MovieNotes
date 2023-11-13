const { Router } = require("express")

const usersRoutes = require("./users.routes")
const moviesRoutes = require("./movies.routes")
const tagsRoutes = require("./tags.routes")
const sessionsRouter = require("./sessions.routes")

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRouter);
routes.use("/movies", moviesRoutes)
routes.use("/tags", tagsRoutes)


module.exports = routes