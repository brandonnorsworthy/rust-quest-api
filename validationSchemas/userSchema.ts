import Joi from 'joi';
import CATEGORIES from '../constants/categories';

export default {
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
    showInstrumentPackQuests: Joi.boolean(),
    showVoicePropsPackQuests: Joi.boolean(),
    showSunburnPackQuests: Joi.boolean(),
    categoryFilters: Joi.array()
      .items(
        Joi.string().valid(...CATEGORIES)
      ),
  }).unknown(false),
}