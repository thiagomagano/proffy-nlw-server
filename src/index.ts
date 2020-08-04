const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => res.json({ message: "Tudo ok" }))

app.listen(3333, () => console.log('Server up on: http://localhost:3333'))