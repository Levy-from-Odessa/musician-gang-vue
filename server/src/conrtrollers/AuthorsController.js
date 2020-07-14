const {
	Author,
	Media
} = require('../models')
const _ = require('lodash')
module.exports = {
	async index(req, res) {
		try {
			const params = req.body.id
			if (params) {
				const author = await Author.findAll({
						where: {
							id: params,
						},
						include: [{
							model: Media,
							attributes: ['URL']
						}]
					}).map(author => author.toJSON())
					.map(author => _.extend({},
						author.Media,
						author
					))
				console.log(author)
				res.send(author)
			} else{ 
				const author = await Author.findAll()
				console.log(author)
				res.send(author)
			}

		} catch (error) {
			res.status(400).send({
				error: 'i have no Author'
			})
		}
	},
	async post(req, res) {
		try {
			console.log(req.body)
			const author = await Author.create({ name: '1', phone_number: '1', email: '1', MediaId: '1' })
			
			res.send({
				author: author
			})
		} catch (error) {
			res.status(400).send({
				error: 'while trying to add Author'
			})
		}

	},
	async delete(req, res) {
		try {
			const { 
				id
			} = req.body
			await Author.destroy({
				where: {
					id: id
				}
			})
			res.send('successful' + id)
		} catch (error) {
			res.status(400).send({
				error: 'Cant delete'
			})
		}

	},
	async edit(req, res) {

		try {
			const {
				id
			} = req.body
			const author = await Author.findOne({
				where: {
					id: id
				}
			})
			console.log(author)
			author.update(req.body)
			console.log(author)
			res.send({
				author: author
			})
		} catch (error) {
			res.status(400).send({
				error: 'cant udate'
			})
		}

	}
}