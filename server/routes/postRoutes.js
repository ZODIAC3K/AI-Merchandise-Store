import { Router } from "express";
import {
	createPost,
	updatePost,
	deletePost,
	fetchAllPosts,
	fetchPost,
} from "../controllers/postController.js";

const router = Router();

router.get("/", fetchAllPosts);
router.get("/:id", fetchPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
