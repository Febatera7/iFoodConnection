module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('t_ifd_tel_rest', {
            cd_telefone: {
                type: Sequelize.STRING(11),
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            t_ifd_end_cd_end: {
                type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
                references: {
                    model: 't_ifd_end',
                    key: 'cd_end'
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
        return queryInterface.dropTable('t_ifd_tel_rest');
    }
}