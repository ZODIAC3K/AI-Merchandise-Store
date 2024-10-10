import prisma from "../db/db.config.js";

export const fetchAllComments = async (req, res) => {
	const commentData = await prisma.comment.findMany({});

	return res.json({
		status: 200,
		data: commentData,
	});
};

export const fetchComment = async (req, res) => {
	const commentID = req.params.id;
	try {
		const commentData = await prisma.comment.findUnique({
			where: {
				id: commentID,
			},
		});
		if (commentData) {
			return res.json({
				status: 200,
				data: commentData,
			});
		} else {
			return res.json({
				status: 404,
				message: "Comment Not Found!!",
			});
		}
	} catch (error) {
		return res.json({
			status: 500,
			message: "Something Went Wrong Oops!!",
		});
	}
};

export const createComment = async (req, res) => {
	const { user_id, post_id, comment } = req.body;

	try {
		const [updateComment, newComment] = await prisma.$transaction([
			prisma.post.update({
				where: {
					id: Number(post_id),
				},
				data: {
					comment_count: {
						increment: 1,
					},
				},
			}),
			prisma.comment.create({
				data: {
					user_id: Number(user_id),
					post_id: Number(post_id),
					comment: comment,
				},
			}),
		]);

		return res.status(200).json({
			status: 200,
			data: newComment,
			message: "Comment Created Successfully",
		});
	} catch (error) {
		if (error.code === "P2003") {
			return res.status(404).json({
				status: 404,
				message: "User ID or Post ID Not Found!",
			});
		}

		return res.status(500).json({
			status: 500,
			message: "An error occurred while creating the comment.",
			error: error.message,
		});
	}
};

export const updateComment = async (req, res) => {
	const commentID = req.params.id;
	const { user_id, title, description } = req.body;
	try {
		const commentData = await prisma.comment.update({
			where: {
				id: commentID,
			},
			data: {
				user_id: user_id,
				title: title,
				description: description,
			},
		});

		return res.json({
			status: 200,
			data: commentData,
			message: "Comment Updated Successfuly",
		});
	} catch (error) {
		if (error.code === "P2025") {
			return res.json({
				status: 404,
				message: "Comment Not Found!",
			});
		}

		return res.status(500).json({
			status: 500,
			message: "An error occurred while updating the comment.",
			error: error.message,
		});
	}
};

export const deleteComment = async (req, res) => {
	const commentID = req.params.id;

	try {
		// Use a transaction to first get the post_id, then decrement the comment count, and delete the comment
		await prisma.$transaction(async (prisma) => {
			const commentData = await prisma.comment.findUnique({
				where: {
					id: commentID,
				},
				select: {
					post_id: true, // Get only the post_id field
				},
			});

			if (!commentData) {
				throw new Error("Comment Not Found");
			}

			const postID = commentData.post_id;

			await prisma.post.update({
				where: {
					id: postID,
				},
				data: {
					comment_count: {
						decrement: 1,
					},
				},
			});

			await prisma.comment.delete({
				where: {
					id: commentID,
				},
			});
		});

		return res.status(200).json({
			status: 200,
			message: "Comment Deleted!",
		});
	} catch (error) {
		if (error.code === "P2025") {
			return res.json({
				status: 404,
				message: "Comment Not Found!",
			});
		} else {
			return res.status(500).json({
				status: 500,
				message: "An error occurred while updating the user.",
				error: error.message,
			});
		}
	}
};
