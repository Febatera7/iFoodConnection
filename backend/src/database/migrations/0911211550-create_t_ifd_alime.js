module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('t_ifd_alime', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
            },
            cd_alimento: {
                type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
                allowNull: false,
                primaryKey: true,
            },
            nm_alimento: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            ds_alimento: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            ds_tipo: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            vl_alimento: {
                type: Sequelize.FLOAT(6, 2),
                allowNull: false,
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
        return queryInterface.dropTable('t_ifd_alime');
    }
}