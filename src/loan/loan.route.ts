import { Router } from "express";
import { Request, Response } from "express";
import { LoanController } from "./loan.controller";
const router = Router();
const loanController = new LoanController();
router.post("/create-loan", (req: Request, res: Response) => {
  loanController.createLoan(req, res);
});

router.post("/create-LoanBid", (req: Request, res: Response) => {
  loanController.createLoanBid(req, res);
});


router.get("/loans", (req: Request, res: Response) => {
  loanController.getAvailableLoans(req, res);
});

router.put("/accept-loanbid", (req: Request, res: Response) => {
  loanController.acceptLoanBid(req, res);
});

router.put("/repay-loan", (req: Request, res: Response) => {
  loanController.repayLoan(req, res);
});

router.get("/loan/loanbids/:loanId", (req: Request, res: Response) => {
  loanController.getLoanLoanBids(req, res);
});

router.get("/user/loanbids/:userId", (req: Request, res: Response) => {
  loanController.getUserbrrowRequest(req, res);
});

router.get("/user/debts/:userId", (req: Request, res: Response) => {
  loanController.getUserDebts(req, res);
});

router.get("/loans", (req: Request, res: Response) => {
  loanController.getAvailableLoans(req, res);
});


export default router;
