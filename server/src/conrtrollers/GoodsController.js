const {Good, Media} = require('../models')
module.exports  = { 
	async index (req, res) {
		try{
			const goods = await Good.findAll({
				include: [{
					model: Media,
					attributes: ['URL']
				}]
			})
			res.send(goods)
		} catch(error) {
			res.status(400).send({
				error: 'i have no goods'
			})
		}
	},
	async post (req, res) {
		try{
			console.log(req.body)
			const good = await Good.create(req.body)
			res.send({
				good: good
			})
		} catch(error) {
			res.status(400).send({
				error: 'while trying to add good'
			})
		}
		
	},
	async delete (req, res) {
		try{
			const {id} = req.body
			await Good.destroy({
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
			const good = await Good.findOne({
				where:{
					id: id
				}
			})
			good.update(req.body)
			res.send({good: good})
		} catch(error) {
			res.status(400).send({
				error: 'cant udate'
			})
		}
		
	}
}