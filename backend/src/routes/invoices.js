const express = require('express');
const asyncHandler = require('express-async-handler');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', asyncHandler(async (req, res) => {
  const invoices = await req.prisma.invoice.findMany({ include: { user: true } });
  res.json(invoices);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const invoice = await req.prisma.invoice.findUnique({ where: { id: parseInt(req.params.id) }, include: { user: true } });
  if (!invoice) return res.status(404).json({ message: 'Not found' });
  res.json(invoice);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { userId, amount, status, dueDate } = req.body;
  const invoice = await req.prisma.invoice.create({ data: { userId, amount, status, dueDate: new Date(dueDate) } });
  res.status(201).json(invoice);
}));

router.put('/:id/status', asyncHandler(async (req, res) => {
  const { status } = req.body;
  const invoice = await req.prisma.invoice.update({ where: { id: parseInt(req.params.id) }, data: { status } });
  res.json(invoice);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  await req.prisma.invoice.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).end();
}));

module.exports = router;
