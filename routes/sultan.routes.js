const {Router} = require('express')
const config = require('config')
const Sultan = require('../models/Sultan')

const router = Router()

router.post('/addsultan',
	async (req, res) => {
		try {
			const viziers = config.get('viziers')

			const {name} = req.body
			const sultan = new Sultan({name})
			sultan.viziers = viziers
			await sultan.save()
			res.json(name)
			res.status(201).json({message: `Султан создан `})
		} catch (e) {

			res.status(500).json({message: 'Не удалось создать'})
		}
		res.status(200).json({message: 'запрос прошел'})

	})


router.post('/delsultan',
	async (req, res) => {
		try {

			console.log(req.body)
			const id = req.body.id

			let result = await Sultan.findOne({_id: id});

			result.delete()

			res.status(201).json({message: `Султан удален `})
		} catch (e) {

			res.status(500).json({message: 'Не удалось удалить'})
		}
		res.status(200).json({message: 'запрос прошел'})

	})


router.post('/addtalents',
	async (req, res) => {
		try {

			const idval = req.body.id
			const data = req.body.data
			let id = {_id: idval}
			await Sultan.findOneAndUpdate(id, {viziers: data});

			res.status(201).json({message: 'Пользователь создан'})

		} catch (e) {

			res.status(500).json({message: 'Не удалось создать'})
		}

		res.status(200).json({message: 'запрос прошел'})

	})

router.post('/getAllViziers',
	async (req, res) => {
		try {

			let id = req.body

			const result = await Sultan.findOne(id);

			res.json(result)
			res.status(201).json({message: 'Визири найдены'})


		} catch (e) {
			res.status(500).json({message: 'Ошибочка'})
		}

		res.status(200).json({message: 'запрос прошел'})

	})

router.get('/getAllSultans',
	async (req, res) => {
		try {
			let result = await Sultan.find({});
			res.json(result)

			res.status(201).json({message: 'Все султаны'})

		} catch (e) {
			res.status(500).json({message: 'Не удалось получить султанов'})
		}

		res.status(200).json({message: 'запрос прошел'})

	})


module.exports = router


