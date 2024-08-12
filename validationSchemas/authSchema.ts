import Joi from 'joi';
import { register } from 'module';

export default {
  register: Joi.object({
    username: Joi.string()
      .min(4)
      .max(16)
      .required(),
    password: Joi.string()
      .min(12)
      .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
      }),
  }),

  login: Joi.object({
    username: Joi.string()
      .required(),
    password: Joi.string()
      .required(),
  }),
}