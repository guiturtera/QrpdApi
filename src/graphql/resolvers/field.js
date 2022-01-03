const { Field, FieldTC } = require('../../models/field');
const { Resolver } = require('graphql-compose');

module.exports.getFieldsFromEntity = new Resolver({
    name: 'getFieldsFromEntity',
    type: [FieldTC],
    resolve: async (source) => {
      const entityId = source.args.entityId;
      const fields = await Field.find({ entity: entityId });
      return fields
    },
  }, FieldTC.schemaComposer);

/*module.exports.updateEntity = async function(field) {
    try {
        const entityFound = await Entity.findById(field.entity);
        
        if (!entityFound) {
            throw new Error(`Entity with id ${field.entity} not found!`)
        }
        if (!entityFound.fields.find((el) => el._id.toString() === field._id.toString())) {
            console.log("Adicionando na lista")
            entityFound.fields.push(field);
            await entityFound.save();
        }
        //entityFound.fields.push(field._id);
    } catch (err) {
        throw err;
    }
}*/