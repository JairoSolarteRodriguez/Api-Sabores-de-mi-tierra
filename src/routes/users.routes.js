import { Router } from "express"
import { getUsers, createUser, activationUser } from "../controllers/user.controller.js"

const router = Router()

router.get("/users", getUsers)
router.post("/register", createUser)
router.post("/activate", activationUser)
router.get("/users/:id")
router.put("/users/:id")
router.delete("/users/:id")

export default router
