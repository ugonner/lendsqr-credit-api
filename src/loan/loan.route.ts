import { Router } from "express";
import { Request, Response } from "express";
import { AuthGuard } from "../guards/auth.guard";
import { RoleGuard } from "../guards/role.guard";
import { DTOValidationGuard } from "../guards/validation.guard";
import { LoanController } from "./loan.controller";
import { LoanBidDTO, LoanDTO } from "./loan.dto";
const router = Router();
const loanController = new LoanController();
router.post(
  "/create-loan",
  AuthGuard.isLoggedIn(),
  RoleGuard.allowRoles(["admin", "lender"]),
  DTOValidationGuard.validationSchema(LoanDTO),
  (req: Request, res: Response) => {
    loanController.createLoan(req, res);
  }
);

router.post(
  "/create-LoanBid",

  AuthGuard.isLoggedIn(),
  DTOValidationGuard.validationSchema(LoanBidDTO),
  (req: Request, res: Response) => {
    loanController.createLoanBid(req, res);
  }
);

router.get(
  "/debts/:userId",

  AuthGuard.isLoggedIn(),
  (req: Request, res: Response) => {
    loanController.getUserDueDebts(req, res);
  }
);


router.get("/loans", (req: Request, res: Response) => {
  loanController.getAvailableLoans(req, res);
});

router.put(
  "/accept-loanbid",
  AuthGuard.isLoggedIn(),
  RoleGuard.allowRoles(["admin", "lender"]),
  (req: Request, res: Response) => {
    loanController.acceptLoanBid(req, res);
  }
);

router.put(
  "/repay-loan",
  AuthGuard.isLoggedIn(),
  (req: Request, res: Response) => {
    loanController.repayLoan(req, res);
  }
);

router.get(
  "/loan/loanbids/:loanId",
  AuthGuard.isLoggedIn(),
  (req: Request, res: Response) => {
    loanController.getLoanLoanBids(req, res);
  }
);

router.get(
  "/user/loanbids/:userId",
  AuthGuard.isLoggedIn(),
  (req: Request, res: Response) => {
    loanController.getUserbrrowRequest(req, res);
  }
);

router.get(
  "/user/debts/:userId",
  AuthGuard.isLoggedIn(),
  (req: Request, res: Response) => {
    loanController.getUserDebts(req, res);
  }
);

router.get("/loans", (req: Request, res: Response) => {
  loanController.getAvailableLoans(req, res);
});


export default router;
