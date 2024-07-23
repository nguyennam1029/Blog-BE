import Joi from "joi";

export const email = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  })
  .required();

export const password = Joi.string().min(6).required();
export const name = Joi.string().min(3).required();
export const confirmPassword = Joi.string().min(6);
// =============== POST =================

export const id = Joi.required();
export const title = Joi.string().required();
export const image = Joi.string().required();
export const status_code = Joi.string().required();
export const description = Joi.string().required();
export const short_description = Joi.string().required();
export const category_code = Joi.string().uppercase().alphanum().required();

// =============== CATEGORY =================
export const label = Joi.string().required();
