import Express, {NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from 'cors';
import UserRouter from "./user/user.route";
import LoanRouter from "./loan/loan.route";
import TransactionRouter from "./transaction/transaction.route";
dotenv.config();

const app = Express();

app.use( [cors(), logger('dev')]);
app.use(Express.json());
app.use(Express.urlencoded());

app.use("/user", UserRouter);
app.use("/loan", LoanRouter);
app.use("/transaction", TransactionRouter);

app.use("/", (req, res) => {
  res.send(`Cannot bad error ${req.url}`);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if(err){
        return res.json(err);
    }
    return res.send("success");
})

app.listen(3400, () => {
    console.log('connected')
})