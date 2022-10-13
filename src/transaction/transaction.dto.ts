import Joi from "joi";

export const TransactionDTO = Joi.object({
  payer: Joi.number()
    .required(),
  receiver: Joi.number()
    .required(),
  amount: Joi.string()
    .pattern(/^[0-9\.]+$/)
    .required(),
});

export const UserTransactionDTO = Joi.object({
  userId: Joi.number()
    .required(),
  amount: Joi.string()
    .pattern(/^[0-9\.]+$/)
    .required(),
});
