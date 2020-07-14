const {Media} = require('../models')
module.exports  = { 
	async index (req, res) {
		try{
			const media = await Media.findAll()
			res.send(media)
		} catch(error) {
			res.status(400).send({
				error: 'i have no media'
			})
		}
	},
	async post (req, res) {
		try{
			console.log(req.body)
			const media = await Media.create(req.body)
			res.send({
				media: media
			})
		} catch(error) {
			res.status(400).send({
				error: 'while trying to add media'
			})
		}
		
	},
	async delete (req, res) {
		try{
			const {id} = req.body
			await Media.destroy({
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
			const media = await Media.findOne({
				where:{
					id: id
				}
			})
			media.update(req.body)
			res.send({media: media})
		} catch(error) {
			res.status(400).send({
				error: 'cant udate'
			})
		}
		
	}
}