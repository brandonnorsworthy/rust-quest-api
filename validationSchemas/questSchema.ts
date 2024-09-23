import Joi from 'joi';

export default {
  allQuests: Joi.object({
    page: Joi.number()
      .integer()
      .min(1)
  }),

  idSchema: Joi.object({
    id: Joi.number()
      .integer()
      .min(1)
      .required(),
  }),

  filterSchema: Joi.object({
    categories: Joi.string()
  }),

  create: Joi.object({
    title: Joi.string()
      .min(1)
      .required(),
    description: Joi.string()
      .min(1)
      .required(),
    objectives: Joi.array()
      .items(Joi.string())
      .min(1)
      .required(),
    imageUrl: Joi.string()
      .min(1),
    categoryId: Joi.number()
      .min(1)
      .required(),
  }),

  update: Joi.object({
    title: Joi.string()
      .min(1),
    description: Joi.string()
      .min(1),
    objectives: Joi.array()
      .items(Joi.string()),
    image_url: Joi.string()
      .min(1),
    categoryId: Joi.number()
      .min(1),
  }),
}