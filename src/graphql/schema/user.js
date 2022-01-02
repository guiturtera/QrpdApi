const { UserTC } = require('../../models/user');

const { SchemaComposer } = require('graphql-compose');
const { addMongooseAutoCrud } = require('./merge');

let schemaComposer = new SchemaComposer();

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
schemaComposer = addMongooseAutoCrud(schemaComposer, UserTC, 'Users');

module.exports = schemaComposer;