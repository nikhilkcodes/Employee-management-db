const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helper/auth')
const jwt = require('jsonwebtoken')

const signupUser = async (req, res) => {
	try {
		const { name, date, email, password, picture } = req.body;

		// Check if name was entered
		if (!name) {
			return res.json({
				error: 'name is required',
			});
		}

		if (!password || password.length < 6) {
			return res.json({
				error: 'Password is required and should be at least 6 characters long',
			});
		}

		const exist = await User.findOne({ email });
		if (exist) {
			return res.json({
				error: 'Email and phone is already taken',
			});
		}
		const hashedPassword = await hashPassword(password)

		const user = await User.create({
			name,
			date,
			email,
			password: hashedPassword,
			picture,
		});

		return res.json(user);
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			error: 'Internal server Error',
		});
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.json({ message: 'Please enter all the details' });
		}

		const userExist = await User.findOne({ email: req.body.email });
		if (!userExist) {
			return res.json({ message: 'Wrong credentials' });
		}

		const isPasswordMatched = await comparePassword(password, userExist.password);
		if (!isPasswordMatched) {
			return res.json({ message: 'Wrong credentials pass' });
		}

		const token = await jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRE,
		});

		const userId = userExist._id;

		return res
			.cookie('token', token, { httpOnly: true })
			.json({ success: true, message: 'LoggedIn Successfully', userId });
	} catch (error) {
		console.error('Error in loginUser route:', error);
		return res.json({ error: error });
	}
};

// creating user routes to fetch users data

const getProfile = async (req, res) => {
	try {
		const user = await User.findOne();
		if (!user) {
			return res.json({ message: 'No user found' })
		}
		return res.json({ user: user })
	} catch (error) {
		return res.json({ error: error });
	}
}

const getAllProfile = async (req, res) => {
	try {
		const allUsers = await User.find({});

		if (allUsers.length === 0) {
			return res.json({ message: 'No users found in the database' });
		}
		res.json(allUsers);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};
const tokenBlacklist = new Set();
const addToBlacklist = (token) => {
	tokenBlacklist.add(token);
};

const logoutUser = (req, res) => {
	try {
		const { token } = req.cookies;

		// Add the token to the blacklist
		if (token) {
			addToBlacklist(token);
		}

		// Clear the 'token' cookie on the client side
		res.clearCookie('token', { httpOnly: true });

		return res.json({ success: true, message: 'Logged out successfully' });
	} catch (error) {
		return res.json({ error: error.message });
	}
};

module.exports = { signupUser, loginUser, getProfile, getAllProfile, logoutUser };
