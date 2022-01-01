const addMongooseAutoCrud = (schemaComposer, ModelTC) => {
    schemaComposer.Query.addFields({
        findbyId: ModelTC.mongooseResolvers.findById(),
        findbyIds: ModelTC.mongooseResolvers.findByIds(),
        findOne: ModelTC.mongooseResolvers.findOne(),
        findMany: ModelTC.mongooseResolvers.findMany(),
        dataLoader: ModelTC.mongooseResolvers.dataLoader(),
        dataLoaderMany: ModelTC.mongooseResolvers.dataLoaderMany(),
        count: ModelTC.mongooseResolvers.count(),
        userConnection: ModelTC.mongooseResolvers.connection(),
        userPagination: ModelTC.mongooseResolvers.pagination(),
      });
      
      schemaComposer.Mutation.addFields({
        createOne: ModelTC.mongooseResolvers.createOne(),
        createMany: ModelTC.mongooseResolvers.createMany(),
        updateById: ModelTC.mongooseResolvers.updateById(),
        updateOne: ModelTC.mongooseResolvers.updateOne(),
        updateMany: ModelTC.mongooseResolvers.updateMany(),
        removeById: ModelTC.mongooseResolvers.removeById(),
        removeOne: ModelTC.mongooseResolvers.removeOne(),
        removeMany: ModelTC.mongooseResolvers.removeMany(),
      });

      return schemaComposer;
}

module.exports = { addMongooseAutoCrud };