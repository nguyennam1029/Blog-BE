// const { Sequelize } = require('sequelize');
import {Sequelize} from "sequelize"
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('blog', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});
const connectionDatabase = async() =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectionDatabase()