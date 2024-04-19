import { Router } from "express"
import db from '../mocks/products.json' with {type: 'json'}

const itemsRouter = Router()

itemsRouter.get('/', (req, res) => {
	const search = req.query.q

	if(!search) return res.status(404).json(
		{
			result: false,
			response: 'La búsqueda está vacía'
		}
	)

	const itemsFounded = db.products.filter(item => {
		return (
			item.title.toLowerCase().includes(search.toLowerCase())
			||
			item.brand.toLowerCase().includes(search.toLowerCase())
			||
			item.category.toLowerCase().includes(search.toLowerCase())
		)
	})

	if(itemsFounded.length > 0) {
		return res.json(
			{
				result: true,
				response: itemsFounded
			}
		)
	} else {
		return res.json(
			{
				result: false,
				response: 'Sin resultados'
			}
		)
	}
})

itemsRouter.get('/:id', (req, res) => {
	const { id } = req.params
	const itemFounded = db.products.find(item => item.id == id)
	if(itemFounded) return res.json(
		{
			result: true,
			response: itemFounded
		}
	)
	return res.json(
		{
			result: false,
			response: 'Sin resultados'
		}
	)
})

export default itemsRouter