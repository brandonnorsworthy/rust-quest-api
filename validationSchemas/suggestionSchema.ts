import Joi from 'joi';

export default {
  suggestion: Joi.object({
    title: Joi.string()
      .min(1)
      .max(128)
      .required(),
    description: Joi.string()
      .required()
      .max(512)
  }),
}