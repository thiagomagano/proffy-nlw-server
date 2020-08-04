import express from 'express';
import routes from './routes';

const app = express();

app.listen()

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log('\n\nServer up on port: http://localhost:3333'))