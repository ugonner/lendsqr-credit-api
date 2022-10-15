import Express, {NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from 'cors';
import UserRouter from "./user/user.route";
import LoanRouter from "./loan/loan.route";
import TransactionRouter from "./transaction/transaction.route";
import { ApiResponse } from './utils/api-response';
dotenv.config();

const app = Express();
const oneDay = 1000 * 60 * 60 * 24;

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
        const error = ApiResponse.fail(err.message, 500, err);
        return res.json(error);
    }
    return res.send("success");
})

app.listen(process.env.PORT, () => {
    console.log('connected')
})
export default app