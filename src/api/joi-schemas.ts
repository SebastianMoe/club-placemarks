import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  aboutMe: Joi.string().example("A regular guy").optional(),
  imageUrl: Joi.string().example("http://example.com/homer.jpg").optional(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const ClubSpec = Joi.object()
  .keys({
    name: Joi.string().example("DLRG Regensburg").required(),
    description: Joi.string().example("Deutsche Lebens-Rettungs-Gesellschaft Ortsgruppe Regensburg").optional(),
    latitude: Joi.number().example(49.0195).optional(),
    longitude: Joi.number().example(12.0974).optional(),
    category: Joi.string().example("sports").optional(),
    imageUrls: Joi.array().items(Joi.string()).example(["http://example.com/image.jpg"]).optional(),
    userId: IdSpec,
  })
  .label("Club");

export const ClubSpecPlus = ClubSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ClubPlus");

export const ClubArray = Joi.array().items(ClubSpecPlus).label("ClubArray");

export const createMemberStatsSchema = Joi.object({
  total: Joi.number().required(),
  adultMale: Joi.number().required(),
  adultFemale: Joi.number().required(),
  youthMale: Joi.number().required(),
  youthFemale: Joi.number().required(),
  date: Joi.date().required(),
});