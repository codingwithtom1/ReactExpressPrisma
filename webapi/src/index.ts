import express, { Express } from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';

const csrfProtection = csurf({
  cookie: true
});

dotenv.config();
const port = process.env.PORT;
const app: Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(csrfProtection);

app.use(routes);
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
