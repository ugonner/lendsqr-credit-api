import knex from "../../database/app.knexfile";
import request from "supertest";
import app from "../app";
import mocks from "../test.fakes"
let adminAuthToken: string;
let borrowerAuthToken: string;
beforeAll(async () => {
  try {
    await knex.migrate.latest({ directory: "dist/database/migrations" });
    console.log("Migration complete");
  } catch (e) {
    console.log("FAILED", e);
  }
});

afterAll(async () => {
  try {
    await knex.migrate.rollback({ directory: "dist/database/migrations" });
    knex.destroy();
    
  } catch (e) {
    console.log(e);
  }
});


describe("Authentication", () => {
  it("should create user, registration", async () => {
    const response = await request(app)
      .post(`/user/register`)
      .send(mocks.user_1);
    const response_2 = await request(app)
      .post(`/user/register`)
      .send(mocks.user_2);

    expect(response.body.status).toBeTruthy();
    expect(response.body.statusCode).toBe(201);
  });

  it("should login user, registration", async () => {
    const response = await request(app).post(`/user/login`).send(mocks.user_1);

    const response_2 = await request(app)
      .post("/user/login")
      .send(mocks.user_2);

    adminAuthToken = response.headers["authorization"];
    borrowerAuthToken = response_2.headers["authorization"];
    expect(response.body.status).toBeTruthy();
    expect(response.body.statusCode).toBe(200);
    expect(response_2.body.status).toBeTruthy();
    expect(response_2.body.statusCode).toBe(200);
  });
});

describe("Transactions: fund and withdraw fund", () => {
  it("should fund account", async () => {
    const response = await request(app)
      .put(`/transaction/fund-account`)
      .set("authorization", borrowerAuthToken)
      .send(mocks.fundAccount);

   const response2 = await request(app)
      .put(`/transaction/fund-account`)
      .set("authorization", adminAuthToken)
      .send(mocks.fundAccountLender);
      
      expect(response.body.status).toBeTruthy();
      expect(response.body.statusCode).toBe(201);
    });

  it("should withdraw fund", async () => {
    const response = await request(app)
      .put(`/transaction/withdraw-fund`)
      .set("authorization", borrowerAuthToken)
      .send(mocks.withdrawFund);

    expect(response.body.status).toBeTruthy();
    expect(response.body.statusCode).toBe(201);
  });

  it("should not withdraw beyound balance", async () => {
    mocks.withdrawFund.amount = "100000";
    const response = await request(app)
      .put(`/transaction/withdraw-fund`)
      .set("authorization", borrowerAuthToken)
      .send(mocks.withdrawFund);

    
    expect(response.body.status).toBeFalsy();
    expect(response.body.statusCode).not.toBe(201);
  });
});


describe("Loan: propose loans and bid for loans, accept loans, repay", () => {
  it("propose loan as a lender or admin", async () => {
    const response = await request(app)
      .post(`/loan/create-loan`)
      .set("authorization", adminAuthToken)
      .send(mocks.loanData);
    
    expect(response.body.status).toBeTruthy();
    expect(response.body.statusCode).toBe(201);
  });

  it("should not propose loan as a borrower or with fund insufficiency", async () => {
    const response = await request(app)
      .post(`/loan/create-loan`)
      .set("authorization", borrowerAuthToken)
      .send(mocks.loanData);
    
    mocks.loanData.amount = "400000";
    const response2 = await request(app)
    .post(`/loan/create-loan`)
    .set("authorization", borrowerAuthToken)
    .send(mocks.loanData);
    expect(response.body.status).not.toBeTruthy();
    expect(response2.body.status).not.toBeTruthy();
    expect(response.body.statusCode).not.toBe(201);
  });


  test("that users / borrower can view all awailable loan proposals from leanders", async () => {
    const response = await request(app)
      .get(`/loan/loans`)
      .set("authorization", adminAuthToken);

    expect(response.body.status).toBeTruthy();
    expect(response.body.statusCode).toBe(200);
  });

  it("should bid for loan", async () => {
    const response = await request(app)
      .post(`/loan/create-loanbid`)
      .set("authorization", borrowerAuthToken)
      .send(mocks.loanBidData);

    expect(response.body.status).toBeTruthy();
    expect(response.body.statusCode).toBe(201);
  });
  

  test("that lender and admins should see all loan bids made to particular laon proposal", async () => {
    const response = await request(app)
      .get(`/loan/loan/loanbids/1`)
      .set("authorization", adminAuthToken);

    expect(response.body.status).toBeTruthy();
    expect(response.body.statusCode).toBe(200);
  });
  
  test("that lender can see all loan bids made to his loan proposals", async () => {
    const response = await request(app)
      .get(`/loan/user/loanbids/1`)
      .set("authorization", adminAuthToken);

    expect(response.body.status).toBeTruthy();
    expect(response.body.statusCode).toBe(200);
  });

  it("should accept bid for loan", async () => {
    const response = await request(app)
      .put(`/loan/accept-loanbid`)
      .set("authorization", adminAuthToken)
      .send(mocks.acceptLoan);

    expect(response.body.status).toBeTruthy();
    expect(response.body.statusCode).toBe(200);
  });
  


  test("that user can view all debts;", async () => {
    const response = await request(app)
      .get(`/loan/debts/2`)
      .set("authorization", adminAuthToken);

    expect(response.body.status).toBeTruthy();
    expect(response.body.statusCode).toBe(200);
  });

  it("should repay loan", async () => {
    const response = await request(app)
      .put(`/loan/repay-loan`)
      .set("authorization", borrowerAuthToken)
      .send(mocks.repayLoan);

    console.log(adminAuthToken);
    console.log(response.body);
    expect(response.body.status).toBeTruthy();
    expect(response.body.statusCode).toBe(200);
  });


  
  

});


  // describe("create accounts", () => {
  //   it("should create accounts", async () => {
  //     const response = await request(app)
  //       .post(`${constants.BASE_URL}/accounts/create`)
  //       .set("Authorization", `Bearer ${constants.userOne.token}`);

  //     const response2 = await request(app)
  //       .post(`${constants.BASE_URL}/accounts/create`)
  //       .set("Authorization", `Bearer ${constants.userTwo.token}`);

  //     expect(response.status).toBe(201);
  //     expect(response.body.data.user_id).toBe(constants.userOne.id);

  //     constants.userOne.account_number = response.body.data.account_number;
  //     constants.userTwo.account_number = response2.body.data.account_number;
  //   });
  // });

  // describe("Accounts Fund And Balance", () => {
  //   it("should Fund Account", async () => {
  //     const response = await request(app)
  //       .post(`${constants.BASE_URL}/accounts/fund`)
  //       .send({ amount: 50000 })
  //       .set("Authorization", `Bearer ${constants.userTwo.token}`);

  //     expect(response.status).toBe(201);
  //   });

  //   it("should get account balance of a user", async () => {
  //     const response = await request(app)
  //       .get(`${constants.BASE_URL}/accounts/balance`)
  //       .set("Authorization", `Bearer ${constants.userTwo.token}`);

  //     expect(response.status).toBe(200);
  //     expect(response.body.data.balance).toBe(50000);
  //   });
  // });

  // describe("withdraw and transfer", () => {
  //   it("should withdraw from account", async () => {
  //     const response = await request(app)
  //       .post(`${constants.BASE_URL}/accounts/withdraw`)
  //       .send({ amount: 10000 })
  //       .set("Authorization", `Bearer ${constants.userTwo.token}`);

  //     expect(response.body.data.balance).toBe(40000);
  //     expect(response.status).toBe(201);
  //   });

  //   it("should transfer funds", async () => {
  //     const response = await request(app)
  //       .post(`${constants.BASE_URL}/accounts/transfer`)
  //       .send({
  //         amount: 10000,
  //         receiverAcct: constants.userOne.account_number,
  //       })
  //       .set("Authorization", `Bearer ${constants.userTwo.token}`);

  //     expect(response.status).toBe(200);
  //   });

  //   it("should receive funds", async () => {
  //     const response = await request(app)
  //       .get(`${constants.BASE_URL}/accounts/balance`)
  //       .set("Authorization", `Bearer ${constants.userOne.token}`);

  //     expect(response.status).toBe(200);
  //     expect(response.body.data.balance).toBe(10000);
  //   });

