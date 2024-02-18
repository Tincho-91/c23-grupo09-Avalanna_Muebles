module.exports = (sequelize, DataTypes) => {
    let alias = "Categories";

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

        description:{
            type: DataTypes.STRING(200),
            allowNull: false
        }

    }

    let config = {
        tablename: "categories",
        timestamps: false

    }


    const Categories = sequelize.define(alias, cols, config);

    return Categories;
}