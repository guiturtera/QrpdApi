import { connect } from "../db/db-handler.mjs";
import { Entity } from "../models/entity.mjs";

await connect()

try {    
    // Entity creation
    console.log("## Entity ##")
    await Entity.deleteMany()
    console.log("Entity collection dropped")

    let resident = await Entity.create({ displayName: "Morador", name: "Morador" });
    let admin = await Entity.create({ displayName: "Administrador", name: "Administrador" });
    let serviceProvider = await Entity.create({ displayName: "Prestador de Serviço", name: "PrestadorServico" });
    let visitor = await Entity.create({ displayName: "Visitante", name: "Visitante" });
    let vehicle = await Entity.create({ displayName: "Veículo", name: "Veiculo" });
    let responsabilityTerm = await Entity.create({ displayName: "Termo de Responsabilidade", name: "TermoResponsabilidade" });

    console.log("Success creating Entity collection")

    // Field Creation
    console.log("\n## Field ##")
    let { Field } = (await import('../models/field.mjs'))
    await Field.deleteMany()
    console.log("Field collection dropped")


    // Resident Fields
    await Field.create({ displayName: "Nome", name: "Nome", entity: resident._id, type: "String", required: true });
    await Field.create({ displayName: "Data de Nascimento", name: "DataNascimento", entity: resident._id, type: "Date", required: true });
    await Field.create({ displayName: "Apartamento", name: "Apartamento", entity: resident._id, type: "String", required: true });
    await Field.create({ displayName: "Veículo", name: "Veiculo", entity: resident._id, ref: "Veiculo", type: "ObjectId", required: true });
    await Field.create({ displayName: "Veículos", name: "Veiculos", entity: resident._id, ref: "Veiculo", type: "[ObjectId]", required: true });
    console.log("Morador - OK")

    // Admin Fields
    await Field.create({ displayName: "CPF", name: "CPF", entity: admin._id, type: "String", required: true });
    console.log("Admin - OK")

    // Service Provider Fields
    await Field.create({ displayName: "Nome", name: "Nome", entity: serviceProvider._id, type: "String", required: true });
    await Field.create({ displayName: "CPF", name: "CPF", entity: serviceProvider._id, type: "String", required: true });
    await Field.create({ displayName: "Data de Nascimento", name: "DataNascimento", entity: serviceProvider._id, type: "Date", required: true });
    //await Field.create({ displayName: "Morador Relacionado", name: "MoradorRelacionado", entity: serviceProvider._id, type: "ObjectId", ref: resident.name, required: false });
    //await Field.create({ displayName: "Veiculo", name: "Veiculo", entity: serviceProvider._id, type: "ObjectId", ref: vehicle.name, required: false });
    console.log("Service Provider - OK")

    // Visitor Fields
    
    await Field.create({ displayName: "Nome", name: "Nome", entity: visitor._id, type: "String", required: true });
    await Field.create({ displayName: "CPF", name: "CPF", entity: visitor._id, type: "String", required: true });
    await Field.create({ displayName: "Data de Nascimento", name: "DataNascimento", entity: visitor._id, type: "Date", required: true });
    //await Field.create({ displayName: "Morador Relacionado", name: "MoradorRelacionado", entity: visitor._id, type: "ObjectId", required: true });
    //await Field.create({ displayName: "Veiculo", name: "Veiculo", entity: visitor._id, type: "ObjectId", ref: vehicle.name, required: false });
    console.log("Visitor - OK")

    // Vehicle Fields
    await Field.create({ displayName: "Modelo", name: "Modelo", entity: vehicle._id, type: "String", required: true });
    await Field.create({ displayName: "Placa", name: "Placa", entity: vehicle._id, type: "String", required: true });
    console.log("Vehicle - OK")

    // Responsability Terms Fields
    console.log("Responsability Terms - OK")

} catch (ex){
    console.log(ex)
}
