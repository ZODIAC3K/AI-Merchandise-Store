import prisma from "../db/db.config.js";

export const fetchAllPosts = async (req, res) => {
	const postData = await prisma.post.findMany({});

	return res.json({
		status: 200,
		data: postData,
	});
};

export const fetchPost = async (req, res) => {
	const postID = req.params.id;
	try {
		const postData = await prisma.post.findUnique({
			where: {
				id: Number(postID),
			},
		});
		if (postData) {
			return res.json({
				status: 200,
				data: postData,
			});
		} else {
			return res.json({
				status: 404,
				message: "Post Not Found!!",
			});
		}
	} catch (error) {
		return res.json({
			status: 500,
			message: "Something Went Wrong Oops!!",
		});
	}
};

export const createPost = async (req, res) => {
	const { user_id, title, description } = req.body;
	try {
		const newPost = await prisma.post.create({
			data: {
				user_id: Number(user_id),
				title: title,
				description: description,
			},
		});

		return res.json({
			status: 200,
			data: newPost,
			message: "Post Created Successfully",
		});
	} catch (error) {
		if (error.code === "P2003") {
			return res.json({
				status: 404,
				message: "User ID Not Found!",
			});
		}
	}
};

export const updatePost = async (req, res) => {
	const postID = req.params.id;
	const { user_id, title, description } = req.body;
	try {
		const postData = await prisma.post.update({
			where: {
				id: postID,
			},
			data: {
				user_id: user_id,
				title: title,
				description: description,
			},
		});

		return res.json({
			status: 200,
			data: postData,
			message: "Post Updated Successfuly",
		});
	} catch (error) {
		if (error.code === "P2025") {
			return res.json({
				status: 404,
				message: "Post Not Found!",
			});
		}
		return res.status(500).json({
			status: 500,
			message: "An error occurred while updating the Post.",
			error: error.message,
		});
	}
};

export const deletePost = async (req, res) => {
	const postID = req.params.id;

	try {
		await prisma.post.delete({
			where: {
				id: Number(postID),
			},
		});

		return res.json({
			status: 200,
			message: "Post Deleted!",
		});
	} catch (error) {
		if (error.code === "P2025") {
			res.json({
				status: 404,
				message: "Post Not Found!",
			});
		} else {
			return res.status(500).json({
				status: 500,
				message: "An error occurred while updating the Post.",
				error: error.message,
			});
		}
	}
};
