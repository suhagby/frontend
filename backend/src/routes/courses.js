const express = require('express');
const asyncHandler = require('express-async-handler');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', asyncHandler(async (req, res) => {
  const courses = await req.prisma.course.findMany({ include: { lessons: true } });
  res.json(courses);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const course = await req.prisma.course.findUnique({ where: { id: parseInt(req.params.id) }, include: { lessons: true } });
  if (!course) return res.status(404).json({ message: 'Not found' });
  res.json(course);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const course = await req.prisma.course.create({ data: { title, description } });
  res.status(201).json(course);
}));

router.put('/:id', asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const course = await req.prisma.course.update({ where: { id: parseInt(req.params.id) }, data: { title, description } });
  res.json(course);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  await req.prisma.course.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).end();
}));

// lessons
router.post('/:id/lessons', asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const lesson = await req.prisma.lesson.create({ data: { title, content, courseId: parseInt(req.params.id) } });
  res.status(201).json(lesson);
}));

router.put('/:id/lessons/:lessonId', asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const lesson = await req.prisma.lesson.update({ where: { id: parseInt(req.params.lessonId) }, data: { title, content } });
  res.json(lesson);
}));

router.delete('/:id/lessons/:lessonId', asyncHandler(async (req, res) => {
  await req.prisma.lesson.delete({ where: { id: parseInt(req.params.lessonId) } });
  res.status(204).end();
}));

module.exports = router;
