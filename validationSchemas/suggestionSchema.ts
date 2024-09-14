import Joi from 'joi';

export default {
  allSuggestions: Joi.object({
    page: Joi.number()
      .min(1)
      .integer()
      .required()
  }),

  suggestion: Joi.object({
    title: Joi.string()
      .min(1)
      .max(128)
      .required(),
    description: Joi.string()
      .required()
      .max(512)
  }),

  convertSuggestionIntoQuest: Joi.object({
    suggestionId: Joi.number()
      .min(1)
      .required()
  })
}