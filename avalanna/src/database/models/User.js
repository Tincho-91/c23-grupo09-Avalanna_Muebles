module.exports = (sequelize, DataTypes) => {
    let alias = "Users";

    let cols = {
        id: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nameAndSurname:{
            type: DataTypes.STRING(100),
            allowNull: false
        },

        email:{
            type: DataTypes.STRING(45),
            allowNull: false
        },

        phoneNumber:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        age:{
            type: DataTypes.TINYINT,
            allowNull: false
        },

        password:{
            type: DataTypes.STRING(100),
            allowNull: false
        },

        rol_id:{
            type: DataTypes.INTEGER,
            allowNull: true
        },

        birthday:{
            type: DataTypes.DATE,
            allowNull: true
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
        tablename: "users",
        timestamps: true

    }


    const Users = sequelize.define(alias, cols, config);

    return Users;
}