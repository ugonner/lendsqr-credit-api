 const mockData = {
   loanData: {
     lender: "1",
     amount: "100",
     rate: "2",
     duration: "3",
     loanType: "simple",
     durationType: "weekly",
   },
   loanBidData: {
     lender: "1",
     loan: "1",
     borrower: "2",
     amount: "100",
     rate: "2",
     duration: "3",
     loanType: "simple",
     durationType: "weekly",
   },
   user_1: {
     name: "user-1",
     email: "user1@example.com",
     password: "password",
     role: "admin",
   },
   user_2: {
     name: "user-2",
     email: "user2@example.com",
     password: "password",
   },
   fundAccount: {
     userId: "2",
     amount: "1000",
   },
   fundAccountLender: {
     userId: "1",
     amount: "100000",
   },
   withdrawFund: {
     userId: "2",
     amount: "100",
   },
   acceptLoan: {
     loanId: "1",
     loanBidId: "1",
   },
   repayLoan: {
     payer: "2",
     receiver: "1",
     amount: "200",
     loanId: "1",
   },
 };
export default mockData;