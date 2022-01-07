import { authWrapper } from "../resolvers/auth.mjs"

const addMongooseAutoCrud = (schemaComposer, ModelTC, pluralModelName) => {
    const modelName = ModelTC.getTypeName()
    schemaComposer.Query.addNestedFields({
        ...authWrapper({
          [`${pluralModelName}.Find`]: {
            resolver: ModelTC.mongooseResolvers.findMany({ disableErrorField: true }),
            role: "read"
          },
          [`${pluralModelName}.Count`]: {
            resolver: ModelTC.mongooseResolvers.count({ disableErrorField: true }),
            role: "read"
          },
          [`${pluralModelName}.Connection`]: {
            resolver: ModelTC.mongooseResolvers.connection({ disableErrorField: true }),
            role: "read"
          },
          [`${pluralModelName}.Pagination`]: {
            resolver: ModelTC.mongooseResolvers.pagination({ disableErrorField: true }),
            role: "read"
          },
        }, modelName)
      });
      
      schemaComposer.Mutation.addNestedFields({
        ...authWrapper({
          [`${pluralModelName}.Create`]: {
            resolver: ModelTC.mongooseResolvers.createOne({ disableErrorField: true }),
            role: 'create'
          },
          [`${pluralModelName}.Update`]: {
            resolver: ModelTC.mongooseResolvers.updateById({ disableErrorField: true }),
            role: 'update'
          },
          [`${pluralModelName}.Delete`]: {
            resolver: ModelTC.mongooseResolvers.removeById({ disableErrorField: true }),
            role: 'delete'
          },
        }, modelName)
      });

      return schemaComposer;
}

export { addMongooseAutoCrud };