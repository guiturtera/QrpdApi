const User = require('../../src/models/user');

const createUsers = async () => {
    await (await User.create({ username: "Guilherme", password: "admin1", register: "111" })).save();
    await (await User.create({ username: "Rafael", password: "admin2", register: "222" })).save();
    await (await User.create({ username: "José", password: "admin3", register: "333" })).save();
    await (await User.create({ username: "Luciana", password: "admin4", register: "444" })).save();
}

module.exports.createUsers = createUsers