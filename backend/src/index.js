const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const courseRoutes = require('./routes/courses');
const invoiceRoutes = require('./routes/invoices');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/invoices', invoiceRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 12000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
