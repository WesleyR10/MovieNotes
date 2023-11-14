const { Router } = require("express")
const usersRoutes = Router()

const multer = require("multer")
const uploadConfig = require("../configs/upload")
const upload = multer(uploadConfig.MULTER)

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes