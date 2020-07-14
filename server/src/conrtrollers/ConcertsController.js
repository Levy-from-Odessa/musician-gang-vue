const {Concert, Media} = require('../models')
module.exports  = { 
	async index (req, res) {
		try{
			const concert = await Concert.findAll({
				include:[{
					model: Media,
					attributes: ['URL']
				}]
			})
			
			res.send(concert)
		} catch(error) {
			res.status(400).send({
				error: 'i have no concert'
			})
		}
	},
	async post (req, res) {
		try{
			console.log(req.body)
			const concert = await Concert.create(req.body)
			res.send({
				concert: concert
			})
		} catch(error) {
			res.status(400).send({
				error: 'while trying to add concert'
			})
		}
		
	},
	async delete (req, res) {
		try{
			const {id} = req.body
			await Concert.destroy({
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
			const concert = await Concert.findOne({
				where:{
					id: id
				}
			})
			concert.update(req.body)
			res.send({concert: concert})
		} catch(error) {
			res.status(400).send({
				error: 'cant udate'
			})
		}
		
	},
	async findOne (req, res) {
		try{
			const {eventId} = req.body
			const concert = await Concert.findOne({
				where: {
					id: eventId
				},
				include:[{
					model: Media,
					attributes: ['URL']
				}]
			})
			res.send(concert)
		} catch(error) {
			res.status(400).send({
				error: 'i have no this one concert'
			})
		}
	}
}