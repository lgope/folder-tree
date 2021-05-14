import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import globalErrorHandler from './controllers/errorController.js';
import AppError from './utils/appError.js';
import folderTreeRoutes from './routes/folderTreeRoutes.js';
const app = express();

// Implement CORS
app.use(cors());

app.options('*', cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body Parser Middleware
app.use(express.json());

// Routes
app.use('/api/folders-tree', folderTreeRoutes);

// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }
// app.all('*', (req, res, next) => {
//   next(new AppError(`Sorry! Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);

export default app;
