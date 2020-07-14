const {Gang} = require('../models')
module.exports  = { 
	async index (req, res) {
		try{
			const gang = await Gang.findAll()
			res.send(gang)
		} catch(error) {
			res.status(400).send({
				error: 'i have no Gang'
			})
		}
	},
	async post (req, res) {
		try{
			console.log(req.body)
			const gang = await Gang.create(req.body)
			res.send({
				gang: gang
			})
		} catch(error) {
			res.status(400).send({
				error: 'while trying to add Gang'
			})
		}
		
	},
	async delete (req, res) {
		try{
			const {id} = req.body
			await Gang.destroy({
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
			const gang = await Gang.findOne({
				where:{
					id: id
				}
			})
			gang.update(req.body)
			res.send({gang: gang})
		} catch(error) {
			res.status(400).send({
				error: 'cant udate'
			})
		}
		
	}
}