import mongoose from 'mongoose';
import dotenv from 'dotenv'
import chalk from 'chalk'

dotenv.config({ path: './config.env' });
import app from './app.js';

// DB Config
const DB = process.env.DATABASE_URI.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// Connect to Mongo
mongoose
    // .connect(DB, {
  .connect('mongodb://localhost/folder-tree', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(chalk.redBright(err)));

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`App running on port ${chalk.greenBright(port)}...`)
);
