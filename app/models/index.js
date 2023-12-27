const dbConfig = require('../config/db.config');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectModule: require('mysql2'),
    operatorsAliases: false,
    dialectOptions: {
        useUTC: false
    },
    timezone: '+01:00',

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.clients = require("./client.model.js")(sequelize, Sequelize);
db.patients = require("./patient.model.js")(sequelize, Sequelize);
db.workers = require("./worker.model.js")(sequelize, Sequelize);
db.appointments = require("./appointment.model.js")(sequelize, Sequelize);
db.treatments = require("./treatment.model.js")(sequelize, Sequelize);
db.prescriptions = require("./prescription.model.js")(sequelize, Sequelize);
db.sicknesses = require("./sickness.model.js")(sequelize, Sequelize);
db.vaccinations = require("./vaccination.model.js")(sequelize, Sequelize);
db.charts = require("./chart.model.js")(sequelize, Sequelize);
db.doctors = require("./doctor.model.js")(sequelize, Sequelize);
db.receptionists = require("./receptionist.model.js")(sequelize, Sequelize);

// Associations
db.appointments.hasOne(db.treatments);
db.treatments.belongsTo(db.appointments);

db.appointments.hasOne(db.vaccinations);
db.vaccinations.belongsTo(db.appointments);

db.appointments.hasOne(db.prescriptions);
db.prescriptions.belongsTo(db.appointments);

db.workers.hasOne(db.doctors);
db.doctors.belongsTo(db.workers);

db.workers.hasOne(db.receptionists);
db.receptionists.belongsTo(db.workers);

db.patients.hasOne(db.charts);
db.charts.belongsTo(db.patients);

db.doctors.hasMany(db.appointments);
db.appointments.belongsTo(db.doctors);

db.clients.hasMany(db.patients);
db.patients.belongsTo(db.clients);

db.patients.hasMany(db.sicknesses);
db.sicknesses.belongsTo(db.patients);

db.patients.hasMany(db.appointments);
db.appointments.belongsTo(db.patients);

module.exports = db;
