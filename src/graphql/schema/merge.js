const addMongooseAutoCrud = (schemaComposer, ModelTC, pluralModelName) => {
    schemaComposer.Query.addNestedFields({
        [`${pluralModelName}.FindById`]: ModelTC.mongooseResolvers.findById(),
        [`${pluralModelName}.FindByIds`]: ModelTC.mongooseResolvers.findByIds(),
        [`${pluralModelName}.FindOne`]: ModelTC.mongooseResolvers.findOne(),
        [`${pluralModelName}.FindMany`]: ModelTC.mongooseResolvers.findMany(),
        [`${pluralModelName}.Count`]: ModelTC.mongooseResolvers.count(),
        [`${pluralModelName}.Connection`]: ModelTC.mongooseResolvers.connection(),
        [`${pluralModelName}.Pagination`]: ModelTC.mongooseResolvers.pagination(),
      });
      
      schemaComposer.Mutation.addNestedFields({
        [`${pluralModelName}.Create`]: ModelTC.mongooseResolvers.createOne(),
        [`${pluralModelName}.CreateMany`]: ModelTC.mongooseResolvers.createMany(),
        [`${pluralModelName}.Update`]: ModelTC.mongooseResolvers.updateById(),
        [`${pluralModelName}.UpdateMany`]: ModelTC.mongooseResolvers.updateMany(),
        [`${pluralModelName}.Remove`]: ModelTC.mongooseResolvers.removeById(),
        [`${pluralModelName}.RemoveMany`]: ModelTC.mongooseResolvers.removeMany(),
      });

      return schemaComposer;
}

module.exports = { addMongooseAutoCrud };