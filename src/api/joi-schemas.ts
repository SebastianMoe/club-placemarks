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
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const MemberStatsSpec = Joi.object()
  .keys({
    total: Joi.number().required().example(150),
    adultMale: Joi.number().required().example(60),
    adultFemale: Joi.number().required().example(50),
    youthMale: Joi.number().required().example(20),
    youthFemale: Joi.number().required().example(20),
    date: Joi.string().required().example("2023-12-31"),
    clubId: IdSpec,
  })
  .label("MemberStats");

export const MemberStatsSpecPlus = MemberStatsSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("MemberStatsPlus");

export const MemberStatsArray = Joi.array().items(MemberStatsSpecPlus).label("MemberStatsArray");

export const EventSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Summer Festival"),
    description: Joi.string().optional().example("Fun in the sun"),
    date: Joi.string().required().example("2024-07-15"),
    attendees: Joi.number().required().example(300),
    latitude: Joi.number().required().example(49.0134),
    longitude: Joi.number().required().example(12.1016),
    clubId: IdSpec,
  })
  .label("Event");

export const EventSpecPlus = EventSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("EventPlus");

export const EventArray = Joi.array().items(EventSpecPlus).label("EventArray");

export const ClubSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("FC Springfields"),
    description: Joi.string().optional().example("Local football club"),
    category: Joi.string().required().example("sports"),
    latitude: Joi.number().required().example(49.01),
    longitude: Joi.number().required().example(12.10),
    userId: IdSpec,
    imageUrls: Joi.array().items(Joi.string()).optional(),
  })
  .label("Club");

export const ClubSpecPlus = ClubSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ClubPlus");

export const ClubArray = Joi.array().items(ClubSpecPlus).label("ClubArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example(true).required(),
    token: Joi.string().example("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...").required(),
    userId: IdSpec.required(),
  })
  .label("JwtAuth");