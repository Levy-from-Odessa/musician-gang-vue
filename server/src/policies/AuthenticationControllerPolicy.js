const Joi = require('joi')

module.exports = {
	register (req, res, next){
		const schema = { 
			email: Joi.string().email(),
			password: Joi.string().regex(
				new RegExp('^[a-zA-Z0-9]{8,32}$')
			),
			role: Joi.string().regex(
				new RegExp('0|1')
			)
		}
		const {error} = Joi.validate(req.body, schema)
		if(error) {
			switch (error.details[0].context.key) {
				case 'email':
					res.status(400).send({
						error: 'email isnt correct'
					})
					break
				case 'password':
					res.status(400).send({
						error:'password isnt correct'
					})
					break 
				case 'role':
					res.status(400).send({
						error:'role must be 0 or 1'
					})
					break
				default: 
					res.status(400).send({
						error: 'invalid information'
					})
			}
		} else{
			next()
		}
		
	}
}