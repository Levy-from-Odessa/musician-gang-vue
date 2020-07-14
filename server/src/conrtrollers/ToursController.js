const {
	Tour,
	Concert,
	Media
} = require('../models')
const {
	fn,
	literal
} = require('sequelize')
module.exports = {
	async index(req, res) {
		try {
			const tour = await Tour.findAll()
			res.send(tour)
		} catch (error) {
			res.status(400).send({
				error: 'i have no Tour'
			})
		}
	},
	async post(req, res) {
		try {
			console.log(req.body)
			const tour = await Tour.create(req.body)
			res.send({
				tour: tour
			})
		} catch (error) {
			res.status(400).send({
				error: 'while trying to add Tour'
			})
		}

	},
	async delete(req, res) {
		try {
			const {
				id
			} = req.body
			await Tour.destroy({
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
			const tour = await Tour.findOne({
				where: {
					id: id
				}
			})
			tour.update(req.body)
			res.send({
				tour: tour
			})
		} catch (error) {
			res.status(400).send({
				error: 'cant udate'
			})
		}

	},
	async findTour(req, res) {
		try {
			const {name} = req.body
			const tour = await Tour.findAll({
				where:{
					name: name					
				},
				include: [{
					model: Concert,
					include: [{
						model: Media
					}]
				}]
				
			})


			res.send({
				tour: tour
			})
		} catch (error) {
			res.status(400).send({
				error: 'cant join concert and media'
			})
		}

	},
	async findDistTour(req, res) {
		try {
			const tour = await Tour.findAll({
				group: ['name'],
				attributes: ['name', [fn('COUNT', 'name'), 'count']],
				order: [
					[literal('count'), 'DESC']
				],
				raw: true
			})
			res.send(tour)
		} catch (error) {
			res.status(400).send({
				error: 'i have no Tour'
			})
		}
	},
}