import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import itemsRouter from './src/routes/items.js'

const PORT = process.env.PORT ?? 3001
const FRONT_URL = process.env.FRONT_URL ?? null

const server = express()

server.disable('x-powered-by')
server.use(cors({
	origin: FRONT_URL,
	methods: 'GET'
}))
server.use('/api/items', itemsRouter)
server.all('*', (_,res) => res.redirect(FRONT_URL))

server.listen(PORT, () => {
	console.clear()
	console.log('Servidor listo')
})
