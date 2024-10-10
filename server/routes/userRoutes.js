import { Router } from "express";
import {
	createUser,
	deleteUser,
	fetchAllUsers,
	fetchUser,
	updateUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", fetchAllUsers);
router.get("/:id", fetchUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
