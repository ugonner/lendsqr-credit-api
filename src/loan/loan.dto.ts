import Joi from "joi";

export const LoanDTO = Joi.object({
    lender: Joi.string().pattern(/^[0-9]+$/i).required(),
    amount: Joi.string().pattern(/^[0-9.]+$/).required(),
    rate: Joi.string().pattern(/^[0-9\.]+$/i).required(),
    duration: Joi.string().pattern(/^[0-9]+$/i).required(),
    durationType: Joi.string().pattern(/^[a-z]+$/i).required(),
    loanType: Joi.string()
})


export const LoanBidDTO = Joi.object({
    loan: Joi.string().pattern(/^[0-9]+$/i).required(),
    borrower: Joi.string().pattern(/^[0-9]+$/i).required(),
    lender: Joi.string().pattern(/^[0-9]+$/i).required(),
    amount: Joi.string().pattern(/^[0-9\.]+$/i).required(),
    rate: Joi.string().pattern(/^[0-9\.]+$/i).required(),
    duration: Joi.string().pattern(/^[0-9]+$/i).required(),
    durationType: Joi.string().pattern(/^[a-z]+$/i).required(),
    loanType: Joi.string()
})


export const UpdateLoanBidDTO = Joi.object({
  loan: Joi.string().pattern(/^[0-9]+$/i),

  lender: Joi.string().pattern(/^[0-9]+$/i),

  amount: Joi.string().pattern(/[^[0-9\.]+$/i),

  rate: Joi.string().pattern(/^[0-9\.]+$/i),

  duration: Joi.string().pattern(/^[0-9]+$/i),

  durationType: Joi.string().pattern(/^[a-z]+$/i),
});

export const UpdateLoanDTO = Joi.object({
  lender: Joi.string().pattern(/^[0-9]+$/i),

  amount: Joi.string().pattern(/[^[0-9\.]+$/i),

  rate: Joi.string().pattern(/^[0-9\.]+$/i),

  duration: Joi.string().pattern(/^[0-9]+$/i),

  durationType: Joi.string().pattern(/^[a-z]+$/i),
});
