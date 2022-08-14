import { Router } from "express"
import { getUsers, createUser, activationUser, login } from "../controllers/user.controller.js"

// Middlewares
import { authAdmin } from "../middlewares/authAdmin.js"

const router = Router()

router.get("/users", authAdmin, getUsers)
router.post("/register", createUser)
router.post("/login", login)
router.post("/activate", activationUser)
router.get("/users/:id")
router.put("/users/:id")
router.delete("/users/:id")

export default router
