import Express, {NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from "cookie-parser";
import UserRouter from "./user/user.route";
import LoanRouter from "./loan/loan.route";
import TransactionRouter from "./transaction/transaction.route";
import { ApiResponse } from './utils/api-response';
import { IGenericResponse } from './typings';
dotenv.config();

const app = Express();

app.use( [cors(), logger('dev')]);
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", UserRouter);
app.use("/loan", LoanRouter);
app.use("/transaction", TransactionRouter);

app.use("/", (req, res) => {
    const response: IGenericResponse<boolean> = ApiResponse.success(
      "system runming successfully",
      200,
      true
    );
    res.send(JSON.stringify(response));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if(err){
        const error = ApiResponse.fail(err.message, 500, err);
        return res.json(error);
    }
    const response: IGenericResponse<boolean> = ApiResponse.success("process running fine", 200, true)
    return res.json(response);
})

app.listen(process.env.PORT, () => {
    console.log('connected')
})
export default app