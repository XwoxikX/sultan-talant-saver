const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended:true }))

app.use ("/api/sultan",require('./routes/sultan.routes'))

const PORT = config.get('port') || 5001

if( process.env.NODE_ENV ==='production'){
  app.use('/',express.static(path.join(__dirname, 'client','build')) )

	app.get('*',(req,res) => {
         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
	})
}


async function start() {
	try{
		await mongoose.connect(config.get('mongoUri'),{
			useNewUrlParser:true,
			useUnifiedTopology:true,
			useCreateIndex:true


		})
		app.listen(PORT, ()  => console.log(`App has been started ${PORT}...`))
	} catch (e) {
		console.log('Error',e.message)

	}
}

start()
