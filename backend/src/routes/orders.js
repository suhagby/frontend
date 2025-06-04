const express = require('express');
const asyncHandler = require('express-async-handler');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', asyncHandler(async (req, res) => {
  const orders = await req.prisma.order.findMany({ include: { product: true, user: true } });
  res.json(orders);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const order = await req.prisma.order.findUnique({ where: { id: parseInt(req.params.id) }, include: { product: true, user: true } });
  if (!order) return res.status(404).json({ message: 'Not found' });
  res.json(order);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { userId, productId, quantity, status } = req.body;
  const order = await req.prisma.order.create({ data: { userId, productId, quantity, status } });
  res.status(201).json(order);
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const { status, quantity } = req.body;
  const order = await req.prisma.order.update({ where: { id: parseInt(req.params.id) }, data: { status, quantity } });
  res.json(order);
}));

module.exports = router;
