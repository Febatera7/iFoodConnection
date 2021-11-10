module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('t_ifd_end', {
            cd_end: {
                type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            t_ifd_rest_cd_rest: {
                type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
                references: {
                    model: 't_ifd_rest',
                    key: 'cd_rest'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
            },
            ds_cep: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            ds_uf: {
                type: Sequelize.STRING(2),
                allowNull: false,
            },
            ds_cidade: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            ds_bairro: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            ds_rua: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            nr_restaurante: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            ds_complemento: {
                type: Sequelize.STRING(20),
                allowNull: true,
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
        return queryInterface.dropTable('t_ifd_end');
    }
}