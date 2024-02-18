module.exports = (sequelize, DataTypes) => {
    let alias = "Adresses";

    let cols = {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        country:{
            type: DataTypes.STRING(50),
            allowNull: false
        },

        province:{
            type: DataTypes.STRING(100),
            allowNull: false
        },

        city:{
            type: DataTypes.STRING(100),
            allowNull: false
        },

        number:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        streetName:{
            type: DataTypes.STRING(200),
            allowNull: false
        },

        postalCode:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        locality:{
            type: DataTypes.STRING(200),
            allowNull: false
        },

        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }

    let config = {
        tablename: "addresses",
        timestamps: false

    }


    const Addresses = sequelize.define(alias, cols, config);

    return Addresses;
}