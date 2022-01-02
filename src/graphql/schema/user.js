const User = require('../../models/user');

const { SchemaComposer } = require('graphql-compose');
const { composeMongoose } = require('graphql-compose-mongoose');
const { addMongooseAutoCrud } = require('./merge');

let schemaComposer = new SchemaComposer();

const customizationOptions = {};
const UserTC = composeMongoose(User, customizationOptions);

/*schemaComposer.Query.addFields({
    login: () => "Works"
})*/

/*
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

UserTC.addRelation("createdEvents", {
  resolver: () => UserTC.mongooseResolvers.findMany(),
  prepareArgs: {
    _ids: (source) => source.createdEvents,
  },
  projection: { createdEvents: 1 }
})*/

UserTC.removeField('password');
schemaComposer = addMongooseAutoCrud(schemaComposer, UserTC, 'User', 'Users');

module.exports = schemaComposer;