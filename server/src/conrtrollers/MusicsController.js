const {Music} = require('../models')
module.exports  = { 
	async index (req, res) {
		try{
			const music = await Music.findAll()
			res.send(music)
		} catch(error) {
			res.status(400).send({
				error: 'i have no Music'
			})
		}
	},
	async post (req, res) {
		try{
			console.log(req.body)
			const music = await Music.create(req.body)
			res.send({
				music: music
			})
		} catch(error) {
			res.status(400).send({
				error: 'while trying to add Music'
			})
		}
		
	},
	async delete (req, res) {
		try{
			const {id} = req.body
			await Music.destroy({
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
			const music = await Music.findOne({
				where:{
					id: id
				}
			})
			music.update(req.body)
			res.send({music: music})
		} catch(error) {
			res.status(400).send({
				error: 'cant udate'
			})
		}
		
	}
}