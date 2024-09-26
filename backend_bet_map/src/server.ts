import express, { Response, Request } from "express";
import dotenv from 'dotenv'; 
import cors from 'cors';

import Transaction from './controller/Transaction';
import Closing from './controller/Closing';
import Game from './controller/Game';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json())

app.listen(PORT,()=>{
    console.log(`Your server is running at http://localhost:${PORT}`);
})

app.get('/', (req: Request, res: Response) => {
    res.send("Working");
});

app.post('/transaction',  Transaction);

app.put('/closing',  Closing);

app.get('/game',  Game);
