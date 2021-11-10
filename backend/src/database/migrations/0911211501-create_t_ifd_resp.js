module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('t_ifd_resp', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
            },
            cd_usuario: {
                type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
                allowNull: false,
                primaryKey: true,
            },
            nm_responsavel: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            ds_senha: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nr_cpf: {
                type: Sequelize.STRING(11),
                allowNull: false,
                unique: true,
            },
            ds_email: {
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true,
            },
            ds_token: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn("now"),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('t_ifd_resp');
    }
}