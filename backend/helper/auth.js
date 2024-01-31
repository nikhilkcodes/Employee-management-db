const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const isAuthenticated = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized: No token provided' });
		}

		const verify = await jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(verify.id);
		next();
	} catch (error) {
		// Handle other errors
		return next(error);
	}
};


// password hashing and salting
const hashPassword = (password) => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(12, (err, salt) => {
			if (err) {
				reject(err)
			}
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) {
					reject(err)
				}
				resolve(hash)
			})
		})
	})
}
// password comparing
const comparePassword = (password, hashed) => {
	return bcrypt.compare(password, hashed)
}

module.exports = {
	hashPassword,
	comparePassword,
	isAuthenticated
}
