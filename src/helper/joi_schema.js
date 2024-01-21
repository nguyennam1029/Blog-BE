import Joi from "joi";

export const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ["com", "net"] },
}).required();

export const password = Joi.string().min(6).required();
// =============== POST ================= 
export const title = Joi.string().alphanum().required();
export const image = Joi.string().required();
export const description = Joi.string().required();
export const category_code = Joi.string().uppercase().alphanum().required();


