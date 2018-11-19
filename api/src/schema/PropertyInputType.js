import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

export const fields = {
  id: { type: GraphQLID },
  name: { type: GraphQLString },
  numberOfRooms: { type: GraphQLFloat },
  livingSurface: { type: GraphQLFloat },
  landSurface: { type: GraphQLFloat },
  numberOfParkings: { type: GraphQLInt },
};

export const PropertyInputType = new GraphQLInputObjectType({
  name: 'PropertyInput',
  fields,
});
