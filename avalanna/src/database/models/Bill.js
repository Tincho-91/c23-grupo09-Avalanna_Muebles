module.exports = (sequelize, DataTypes) => {
    let alias = "Bills";

    let cols = {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        number:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        total:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        payment_method:{
            type: DataTypes.STRING(100),
            allowNull: false
        },

        purchaseDate:{
            type: DataTypes.DATE,
            allowNull: false
        },
    }

    let config = {
        tablename: "bills",
        timestamps: false

    }


    const Bills = sequelize.define(alias, cols, config);

    return Bills;
}