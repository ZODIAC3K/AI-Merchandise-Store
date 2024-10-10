import prisma from "../db/db.config.js";

export const fetchAllUsers = async (req, res) => {
	const usersData = await prisma.user.findMany({});

	return res.json({
		status: 200,
		data: usersData,
	});
};

export const fetchUser = async (req, res) => {
	const userID = req.params.id;
	try {
		const usersData = await prisma.user.findUnique({
			where: {
				id: Number(userID),
			},
		});
		if (usersData) {
			return res.json({
				status: 200,
				data: usersData,
			});
		} else {
			return res.json({
				status: 404,
				message: "User Not Found!!",
			});
		}
	} catch (error) {
		return res.json({
			status: 500,
			message: "Something Went Wrong Oops!!",
		});
	}
};

export const createUser = async (req, res) => {
	const { name, email, password } = req.body;
	const findUser = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	if (findUser) {
		return res.json({
			status: 400,
			message: "Email Already Taken, Try Again...",
		});
	}
	// When we use "prisma.<model_name>.create" it creates data and also returns it thats why we are storing it in newUser.
	const newUser = await prisma.user.create({
		data: {
			name: name,
			email: email,
			password: password,
		},
	});

	return res.json({
		status: 200,
		data: newUser,
		message: "New User Created Successfully.",
	});
};

export const updateUser = async (req, res) => {
	const userID = req.params.id;
	const { name, email, password } = req.body;
	try {
		const userData = await prisma.user.update({
			where: {
				id: Number(userID),
			},
			data: {
				name: name,
				email: email,
				password: password,
			},
		});

		return res.json({
			status: 200,
			data: userData,
			message: "User Updated Successfuly",
		});
	} catch (error) {
		if (error.code === "P2025") {
			return res.json({
				status: 404,
				message: "User Not Found!",
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

export const deleteUser = async (req, res) => {
	const userID = req.params.id;

	try {
		await prisma.user.delete({
			where: {
				id: Number(userID),
			},
		});

		return res.json({
			status: 200,
			message: "User Deleted!",
		});
	} catch (error) {
		res.json({
			status: 500,
			message: "Something Went Wrong Oops!!",
		});
	}
};
