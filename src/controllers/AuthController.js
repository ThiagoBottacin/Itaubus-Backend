const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

function generateToken(params = {}){
	return jwt.sign({ params }, authConfig.secret);
}

module.exports = {
    
    async register(req, res) {
        const { email } = req.body;
		
		try {
			if(await User.findOne({ email }))
				return res.status(400).send({ error: "User already exists" });

			const user = await User.create(req.body);
			user.password = undefined;

			return res.send({
				user,
				token: generateToken({ id: user._id }),
			});
		}
		catch (err) {
			return res.status(400).send({ error: 'Registration failed' });
		}
	},
	
	async authenticate(req, res) {
		const { email, password } = req.body;
		
		const user = await User.findOne({ email }).select('+password');

		if(!user || !await bcrypt.compare(password, user.password))
			return res.status(400).send({ error: 'email or password invalid' });

		user.password = undefined;

		res.send({
			user,
			token: generateToken({ id: user._id }),
		});
	},
};
