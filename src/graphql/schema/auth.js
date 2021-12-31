const User = require('../../models/user');
const Event = require('../../models/event');

const { SchemaComposer } = require('graphql-compose');
const { composeMongoose } = require('graphql-compose-mongoose');

let schemaComposer = new SchemaComposer();

const customizationOptions = {};
const UserTC = composeMongoose(User, customizationOptions);
const EventTC = composeMongoose(Event, customizationOptions);

UserTC.addRelation(
  'createdEvents',
  {
    resolver: () => EventTC.mongooseResolvers.findMany(),
    prepareArgs: {
      filter: source => {
        console.log(source)
        return { _id: { $in: source.createdEvents } }
      },
    },
    projection: { createdEvents: true },
  }
);

/*UserTC.addRelation("createdEvents", {
  resolver: () => UserTC.mongooseResolvers.findMany(),
  prepareArgs: {
    _ids: (source) => source.createdEvents,
  },
  projection: { createdEvents: 1 }
})*/

schemaComposer.Query.addFields({
  userById: UserTC.mongooseResolvers.findById(),
  userByIds: UserTC.mongooseResolvers.findByIds(),
  userOne: UserTC.mongooseResolvers.findOne(),
  userMany: UserTC.mongooseResolvers.findMany(),
  userDataLoader: UserTC.mongooseResolvers.dataLoader(),
  userDataLoaderMany: UserTC.mongooseResolvers.dataLoaderMany(),
  userByIdLean: UserTC.mongooseResolvers.findById({ lean: true }),
  userByIdsLean: UserTC.mongooseResolvers.findByIds({ lean: true }),
  userOneLean: UserTC.mongooseResolvers.findOne({ lean: true }),
  userManyLean: UserTC.mongooseResolvers.findMany({ lean: true }),
  userDataLoaderLean: UserTC.mongooseResolvers.dataLoader({ lean: true }),
  userDataLoaderManyLean: UserTC.mongooseResolvers.dataLoaderMany({ lean: true }),
  userCount: UserTC.mongooseResolvers.count(),
  userConnection: UserTC.mongooseResolvers.connection(),
  userPagination: UserTC.mongooseResolvers.pagination(),
});

schemaComposer.Mutation.addFields({
  userCreateOne: UserTC.mongooseResolvers.createOne(),
  userCreateMany: UserTC.mongooseResolvers.createMany(),
  userUpdateById: UserTC.mongooseResolvers.updateById(),
  userUpdateOne: UserTC.mongooseResolvers.updateOne(),
  userUpdateMany: UserTC.mongooseResolvers.updateMany(),
  userRemoveById: UserTC.mongooseResolvers.removeById(),
  userRemoveOne: UserTC.mongooseResolvers.removeOne(),
  userRemoveMany: UserTC.mongooseResolvers.removeMany(),
});

module.exports = schemaComposer.buildSchema();