const addMongooseAutoCrud = (schemaComposer, ModelTC, singularModelName, pluralModelName) => {
    schemaComposer.Query.addFields({
        [pluralModelName]: ModelTC.mongooseResolvers.findMany(),
        [`${pluralModelName}Count`]: ModelTC.mongooseResolvers.count(),
      });
      
      schemaComposer.Mutation.addFields({
        [`${singularModelName}Create`]: ModelTC.mongooseResolvers.createOne(),
        [`${singularModelName}CreateMany`]: ModelTC.mongooseResolvers.createMany(),
        [`${singularModelName}Update`]: ModelTC.mongooseResolvers.updateById(),
        [`${singularModelName}UpdateMany`]: ModelTC.mongooseResolvers.updateMany(),
        [`${singularModelName}Remove`]: ModelTC.mongooseResolvers.removeById(),
        [`${singularModelName}RemoveMany`]: ModelTC.mongooseResolvers.removeMany(),
      });

      return schemaComposer;
}

module.exports = { addMongooseAutoCrud };