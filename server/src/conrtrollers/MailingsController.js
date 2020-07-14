const {Mailing} = require('../models')
module.exports  = { 
	async index (req, res) {
		try{
			const mailing = await Mailing.findAll()
			res.send(mailing)
		} catch(error) {
			res.status(400).send({
				error: 'i have no Mailing'
			})
		}
	},
	async post (req, res) {
		try{
			console.log(req.body)
			const mailing = await Mailing.create(req.body)
			res.send({
				mailing: mailing
			})
		} catch(error) {
			res.status(400).send({
				error: 'while trying to add Mailing'
			})
		}
		
	},
	async delete (req, res) {
		try{
			const {id} = req.body
			await Mailing.destroy({
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
			const mailing = await Mailing.findOne({
				where:{
					id: id
				}
			})
			mailing.update(req.body)
			res.send({mailing: mailing})
		} catch(error) {
			res.status(400).send({
				error: 'cant udate'
			})
		}
		
	}
}