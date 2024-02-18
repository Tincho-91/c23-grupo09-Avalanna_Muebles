module.exports = (sequelize, DataTypes) => {
    let alias = "Images";

    let cols = {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name:{
            type: DataTypes.STRING(50),
            allowNull: false
        },

        path:{
            type: DataTypes.STRING(200),
            allowNull: false
        },

        size:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        id_products:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        id_users:{
            type: DataTypes.INTEGER,
            allowNull: false
        },


    }

    let config = {
        tablename: "images",
        timestamps: false

    }


    const Images = sequelize.define(alias, cols, config);

    return Images;
}