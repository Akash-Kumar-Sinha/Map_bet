import express from 'express';
import dotenv from 'dotenv'; 
import Transaction from './controller/Transaction';
import Reward from './controller/Reward';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Your server is running at http://localhost:${PORT}`);
})

app.post('/transaction',  Transaction);

app.post('/reward',  Reward);
