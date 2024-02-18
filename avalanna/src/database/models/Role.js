module.exports = (sequelize, DataTypes) => {
    let alias = "Roles";

    let cols = {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name:{
            type: DataTypes.STRING(45),
            allowNull: false
        }
        
    }

    let config = {
        tablename: "roles",
        timestamps: false

    }


    const Roles = sequelize.define(alias, cols, config);

    return Roles;
}