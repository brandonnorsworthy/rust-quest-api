import Joi from 'joi';

export default {
  questIdSchema: Joi.object({
    questId: Joi.number()
      .integer()
      .min(1)
      .required(),
  }),
}