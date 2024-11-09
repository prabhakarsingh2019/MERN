import joi from "joi";

export const signupValidation = (req, res, next) => {
  const schema = joi.object({
    firstName: joi.string().min(4).required(),
    lastName: joi.string().min(4),
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};
export const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};
