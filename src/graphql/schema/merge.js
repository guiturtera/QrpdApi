const addMongooseAutoCrud = (schemaComposer, ModelTC, pluralModelName, options) => {
    schemaComposer.Query.addNestedFields({
        [`${pluralModelName}.FindById`]: ModelTC.mongooseResolvers.findById({ disableErrorField: true }),
        [`${pluralModelName}.FindByIds`]: ModelTC.mongooseResolvers.findByIds({ disableErrorField: true }),
        [`${pluralModelName}.FindOne`]: ModelTC.mongooseResolvers.findOne({ disableErrorField: true }),
        [`${pluralModelName}.FindMany`]: ModelTC.mongooseResolvers.findMany({ disableErrorField: true }),
        [`${pluralModelName}.Count`]: ModelTC.mongooseResolvers.count({ disableErrorField: true }),
        [`${pluralModelName}.Connection`]: ModelTC.mongooseResolvers.connection({ disableErrorField: true }),
        [`${pluralModelName}.Pagination`]: ModelTC.mongooseResolvers.pagination({ disableErrorField: true }),
      });
      
      schemaComposer.Mutation.addNestedFields({
        [`${pluralModelName}.Create`]: ModelTC.mongooseResolvers.createOne({ disableErrorField: true }),
        [`${pluralModelName}.CreateMany`]: ModelTC.mongooseResolvers.createMany({ disableErrorField: true }),
        [`${pluralModelName}.Update`]: ModelTC.mongooseResolvers.updateById({ disableErrorField: true }),
        [`${pluralModelName}.UpdateMany`]: ModelTC.mongooseResolvers.updateMany({ disableErrorField: true }),
        [`${pluralModelName}.Remove`]: ModelTC.mongooseResolvers.removeById({ disableErrorField: true }),
        [`${pluralModelName}.RemoveMany`]: ModelTC.mongooseResolvers.removeMany({ disableErrorField: true }),
      });

      return schemaComposer;
}

module.exports = { addMongooseAutoCrud };