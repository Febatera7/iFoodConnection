module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('t_ifd_tel_resp', {
            cd_telefone: {
                type: Sequelize.STRING(11),
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            t_ifd_rest_cd_resp: {
                type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
                references: {
                    model: 't_ifd_resp',
                    key: 'cd_usuario'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
            },
            nr_ddd: {
                type: Sequelize.STRING(2),
                allowNull: false,
            },
            nr_telefone: {
                type: Sequelize.STRING(9),
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
        return queryInterface.dropTable('t_ifd_tel_resp');
    }
}