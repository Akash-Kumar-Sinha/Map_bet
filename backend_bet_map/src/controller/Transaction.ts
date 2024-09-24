import { Request, Response } from "express";

const Transaction = (req: Request, res: Response)=>{
    res.send('transaction');
}

export default Transaction;