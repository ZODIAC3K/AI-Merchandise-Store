import { Router } from "express";
import {
	createComment,
	updateComment,
	deleteComment,
	fetchAllComments,
	fetchComment,
} from "../controllers/commentController.js";

const router = Router();

router.get("/", fetchAllComments);
router.get("/:id", fetchComment);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
