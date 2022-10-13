import Joi from "joi";

export const UserDTO = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  role: Joi.string().alphanum(),
});

export const UpdateUserRoleDTO = Joi.object({
  id: Joi.number().required(),
  role: Joi.string().required(),
});
