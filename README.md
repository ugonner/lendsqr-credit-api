# lendsqr-credit-api

API for a loan-HUB app

TECHNOLOGIES
- Nodejs Typescript
- knex database QueryBuilder,
- Expressjs Framework implementation; Domain Driven Architecture.

FEATURES
- Provides endpoints for lenders to create multiple loan proposals 
based on ther wallet limits.

- And borrowers to be able to make bids for any loan proposal based ON rates, duration and amount

- lenders are able to view all bids made on each loan proposal
- lenders can choose and accept the best loan bids based on the above
indices; rates, duration and amount

- borrowers are able to repay accepted loans
- installmental payments are allowed with checks to block over pays
- can always see due debts
- borrowers are able to adjust loan bids until lender accepts one
on accepting one bid; no further adjustmensts is possible on bids

- app starts with and 
  npm run | yarn "start"

  - run tests with
  npm run | uarn test

github: https://github.com/ugonner/lendsqr-credit-api.git
DD: https://docs.google.com/document/d/18aLTlCEvifrn8qRWV-y7sN42mYAgLFNVDuuYAilSaZU/edit
heroku: https://bonaventure-lendsqr-be-test.herokuapp.com/