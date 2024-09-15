import Joi from 'joi';
import CATEGORIES from '../constants/categories';

export default {
  allUsers: Joi.object({
    page: Joi.number()
      .integer()
      .min(1)
  }),

  questIdSchema: Joi.object({
    questId: Joi.number()
      .integer()
      .min(1)
      .required(),
  }),

  settingsSchema: Joi.object({
    theme: Joi.string()
      .valid('light', 'dark'),
    disableAnimations: Joi.boolean(),
    instrumentDLCQuests: Joi.boolean(),
    voicePropsDLCQuests: Joi.boolean(),
    sunburnDLCQuests: Joi.boolean(),
    categoryFilters: Joi.array()
      .items(
        Joi.string().valid(...CATEGORIES)
      ),
  }).unknown(false),
}