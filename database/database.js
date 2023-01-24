const Sequelize = require('sequelize');
const bcrypt = require('bcrypt')
const zlib = require('zlib');

const sequelize = new Sequelize('yummy', 'postgres', 'buju', {
    dialect: 'postgres'
});

const {DataTypes} = Sequelize;

const Recipes = sequelize.define('recipes', {
    recipe_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recipe_img: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
        const compressed = zlib.deflateSync(value).toString('base64')
        this.setDataValue('description', compressed)
       },
        get() {
        const value = this.getDataValue('description');
        const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
        return uncompressed.toString()
       }
    }, 
    instructions: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
        const compressed = zlib.deflateSync(value).toString('base64')
        this.setDataValue('instruction', compressed)
       },
        get() {
        const value = this.getDataValue('instruction');
        const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
        return uncompressed.toString()
       } 
    },
    prep_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    cook_time: {
        type: DataTypes.TIME,
        allowNull: false 
    },
    serving_number: {
        type: DataTypes.INTEGER
    },
    tools: {
        type: DataTypes.STRING,
    }
}, {
    validate: true
});

const User = sequelize.define('users', {
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    f_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 20]
        }
    },
    l_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 20]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
          }
    },
    password2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    validate: true
})

User.hasMany(Recipes);
Recipes.belongsTo(User);

sequelize.sync({alter: true}).then(() => {
   console.log('Joined successfully');
}).catch((err) => {
   console.log(err);
});

module.exports = {
    User,
    sequelize,
    Recipes
}