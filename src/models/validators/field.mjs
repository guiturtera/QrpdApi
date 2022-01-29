import { Field } from "../field.mjs"

export const nameValidator = async (self, value) => {
    let fields = await Field.find({ entity: self.entity }).select({ "name": true, "_id": false })
    let fieldExists = fields.filter(x => x.name == value).length > 0
    return !fieldExists
}