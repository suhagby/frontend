const express = require('express');
const asyncHandler = require('express-async-handler');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', asyncHandler(async (req, res) => {
  const products = await req.prisma.product.findMany();
  res.json(products);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const product = await req.prisma.product.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;
  const product = await req.prisma.product.create({ data: { name, description, price } });
  res.status(201).json(product);
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;
  const product = await req.prisma.product.update({ where: { id: parseInt(req.params.id) }, data: { name, description, price } });
  res.json(product);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  await req.prisma.product.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).end();
}));

module.exports = router;
