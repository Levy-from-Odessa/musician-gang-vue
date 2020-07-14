const {Bookmark, Good, Media} = require('../models')
const _ = require('lodash')
module.exports  = { 
	async index (req, res) {
		try{
			const bookmark = await Bookmark.findAll()
			res.send(bookmark)
		} catch(error) {
			res.status(400).send({
				error: 'i have no Bookmark'
			})
		}
	},
	async post (req, res) {
		try{
			console.log(req.body)
			const bookmark = await Bookmark.create(req.body)
			res.send({
				bookmark: bookmark
			})
		} catch(error) {
			res.status(400).send({
				error: 'while trying to add Bookmark'
			})
		}
		
	},
	async delete (req, res) {
		try{
			const {id} = req.body
			await Bookmark.destroy({
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
			const bookmark = await Bookmark.findOne({
				where:{
					id: id
				}
			})
			bookmark.update(req.body)
			res.send({bookmark: bookmark})
		} catch(error) {
			res.status(400).send({
				error: 'cant udate'
			})
		}
		
	},
	async findByUser (req, res) {
		try{
			const {id} = req.body
			const bookmark = await Bookmark.findAll({
				where:{
					UserId: id
				},
				include: [{
					model: Good,
					include: [{
						model: Media,
						attribute: ['URL']
					}]
				}]
			}).map(bookmark => bookmark.toJSON())
			.map(bookmark => _.extend({},
				bookmark.Good,
				bookmark.Media,
				bookmark
			))
			res.send(bookmark)
		} catch(error) {
			res.status(400).send({
				error: 'i have no Bookmark with this user'
			})
		}
	},
	
	async findCountByUser (req, res) {
		try{
			const {id} = req.body
			const bookmark = await Bookmark.count({
				where:{
					UserId: id
				}
			})
			console.log({count: bookmark})
			res.send({count: bookmark})
		} catch(error) {
			res.status(400).send({
				error: 'i have no Bookmark with this user and i cant count it'
			})
		}
	}
	
}