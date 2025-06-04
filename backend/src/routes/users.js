const express = require('express');
const asyncHandler = require('express-async-handler');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', asyncHandler(async (req, res) => {
  const users = await req.prisma.user.findMany({ select: { id: true, name: true, email: true, role: true } });
  res.json(users);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const user = await req.prisma.user.findUnique({ where: { id: parseInt(req.params.id) }, select: { id: true, name: true, email: true, role: true } });
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await require('bcryptjs').hash(password, 10);
  const user = await req.prisma.user.create({ data: { name, email, password: hashed, role } });
  res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const { name, email, role } = req.body;
  const user = await req.prisma.user.update({ where: { id: parseInt(req.params.id) }, data: { name, email, role } });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  await req.prisma.user.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).end();
}));

module.exports = router;
