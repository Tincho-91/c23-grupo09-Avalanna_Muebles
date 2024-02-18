module.exports = (sequelize, DataTypes) => {
    let alias = "Products";

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

        price:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        description:{
            type: DataTypes.STRING(250),
            allowNull: false
        },

        id_category:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        extraDescription:{
            type: DataTypes.STRING(200),
            allowNull: false
        },

        discount:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        height:{
            type: DataTypes.STRING(45),
            allowNull: false
        },

        width:{
            type: DataTypes.STRING(45),
            allowNull: false
        },

        depth:{
            type: DataTypes.STRING(45),
            allowNull: false
        },

         createdAt: {
    type: DataTypes.DATE,
    field: 'createdAt'
     },

     updatedAt: {
    type: DataTypes.DATE,
    field: 'updatedAt'
    }

    }

    let config = {
        tablename: "products",
        timestamps: true

    }


    const Products = sequelize.define(alias, cols, config);

    return Products;
}