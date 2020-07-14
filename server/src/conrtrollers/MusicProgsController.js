const {MusicProgs} = require('../models')
module.exports  = { 
	async index (req, res) {
		try{
			const musicProgs = await MusicProgs.findAll()
			res.send(musicProgs)
		} catch(error) {
			res.status(400).send({
				error: 'i have no MusicProgs'
			})
		}
	},
	async post (req, res) {
		try{
			console.log(req.body)
			const musicProgs = await MusicProgs.create(req.body)
			res.send({
				musicProgs: musicProgs
			})
		} catch(error) {
			res.status(400).send({
				error: 'while trying to add MusicProgs'
			})
		}
		
	},
	async delete (req, res) {
		try{
			const {id} = req.body
			await MusicProgs.destroy({
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
			const musicProgs = await MusicProgs.findOne({
				where:{
					id: id
				}
			})
			musicProgs.update(req.body)
			res.send({musicProgs: musicProgs})
		} catch(error) {
			res.status(400).send({
				error: 'cant udate'
			})
		}
		
	}
}