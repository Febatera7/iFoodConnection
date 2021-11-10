module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('t_ifd_rest', {
            cd_rest: {
                type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
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
            nm_usuario: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            ds_email: {
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true,
            },
            nr_cnpj: {
                type: Sequelize.STRING(14),
                allowNull: false,
                unique: true,
            },
            nm_razao_social: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            nm_loja: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            ds_especialidade: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            ds_plano: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            dt_entrada: {
                type: Sequelize.DATE,
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
        return queryInterface.dropTable('t_ifd_rest');
    }
}