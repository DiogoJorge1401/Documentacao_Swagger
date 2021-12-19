import { Router } from 'express'
import { v4 as uuid } from 'uuid'
import { ensureAuthenticated } from './middleware'

const router = Router()

interface Product {
  name: string
  description: string
  price: number
  id: string
}

const products: Product[] = []

router.get('/products/findByName', (req, res) => {
  const { name } = req.query
  const product = products.filter((p) => p.name.includes(String(name)))
  return res.json(product)
})

router.get('/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find((p) => p.id === id)
  return res.json(product)
})

router.post('/products', ensureAuthenticated, (req, res) => {
  const { name, description, price } = req.body
  const productAlredyExists = products.find((p) => p.name == name)
  if (productAlredyExists)
    return res.status(400).json({ message: 'Product alredy exists!' })
  const product: Product = {
    description,
    name,
    price,
    id: uuid(),
  }
  products.push(product)
  return res.json(product)
})

router.put('/products/:id', ensureAuthenticated, (req, res) => {
  const { id } = req.params
  const { name, description, price } = req.body
  const productIndex = products.findIndex((p) => p.id === id)
  if (productIndex < 0)
    return res.status(400).json({ message: "Product doesn't exists!" })
  const product: Product = Object.assign({
    description,
    name,
    price,
    id,
  })
  products[productIndex] = product
  return res.json(product)
})

export { router }
