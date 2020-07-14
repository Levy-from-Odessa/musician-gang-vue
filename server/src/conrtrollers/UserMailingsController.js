const {UserMailing} = require('../models')
module.exports  = { 
	async index (req, res) {
		try{
			const userMailing = await UserMailing.findAll()
			res.send(userMailing)
		} catch(error) {
			res.status(400).send({
				error: 'i have no UserMailing'
			})
		}
	},
	async post (req, res) {
		try{
			console.log(req.body)
			const userMailing = await UserMailing.create(req.body)
			res.send({
				userMailing: userMailing
			})
		} catch(error) {
			res.status(400).send({
				error: 'while trying to add UserMailing'
			})
		}
		
	},
	async delete (req, res) {
		try{
			const {id} = req.body
			await UserMailing.destroy({
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
			const {id} = req.body
			const userMailing = await UserMailing.findOne({
				where:{
					id: id
				}
			})
			userMailing.update(req.body)
			res.send({userMailing: userMailing})
		} catch(error) {
			res.status(400).send({
				error: 'cant udate'
			})
		}
		
	}
}