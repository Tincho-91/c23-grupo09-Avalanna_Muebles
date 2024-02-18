module.exports = (sequelize, DataTypes) => {
    let alias = "Purchases";

    let cols = {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        id_users:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        id_products:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        id_bills:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    }

    let config = {
        tablename: "purcheases",
        timestamps: false

    }


    const Purcheases = sequelize.define(alias, cols, config);

    return Purcheases;
}