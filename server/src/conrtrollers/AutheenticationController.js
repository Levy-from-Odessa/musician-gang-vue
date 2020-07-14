const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')


function jwtSingUser (user) {
	const ONE_WEEK = 60 * 60 * 24 * 7
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_WEEK
	})
}

module.exports  = { 
	async index (req, res) {
		try{
			const user = await User.findAll()
			res.send(user)
		} catch(error) {
			res.status(400).send({
				error: 'i have no users'
			})
		}
		
	},
	async register (req, res) {
		
		try{
			console.log(req.body)
			const user = await User.create(req.body)
			console.log(user)
			res.send({
				user: user,
				token: jwtSingUser(user.toJSON())
			})
		} catch(error) {
			res.status(400).send({
				error: 'this email already exsist'
			})
		}
	},
	
	async login (req, res) {
		try{
			console.log(req.body)
			const {email, password} = req.body

			const user = await User.findOne({
				where: {
					email: email,
				}	
			})
			if(!user){
				return res.status(400).send({
					error:'incorrect email'
				})
			}
			const isPasswordValid = await user.comparePassword(password)
			if(isPasswordValid){
				return res.status(400).send({
					error:'incorrect password'
				})
			}
			
			res.send({
				user: user,
				token: jwtSingUser(user.toJSON())
			})
			
		} catch(error) {
			res.status(400).send({
				error: 'this isnt a user'
			})
		}
		
	},
	async delete (req, res) {
		try{
			const {id} = req.body
			await User.destroy({
				where: {
					id: id
				}
			})
			res.send('successful'+ id )
		} catch(error) {
			res.status(400).send({
				error: 'Cant delete'
			})
		}
		
	},
	async edit (req, res) {
	
		try{
			const {id, email, password} = req.body
			const user = await User.findOne({
				where:{
					id: id
				}
			})
			console.log(user)
			user.update({
				email: email,
				password: password
			})
			console.log(user)
			res.send({
				user: user,
				token: jwtSingUser(user.toJSON())
			})
		} catch(error) {
			res.status(400).send({
				error: 'cant udate'
			})
		}
		
	}
}