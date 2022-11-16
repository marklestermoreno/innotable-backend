
module.exports = (sequelize, Sequelize) => {
    const Notes = sequelize.define("notes", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.STRING
        },
        passwordProtected: {
            type: Sequelize.BOOLEAN
        },
        password: {
            type: Sequelize.STRING
        }
    })
    return Notes;
}