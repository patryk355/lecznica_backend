const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const clientsRoutes = require('./app/routes/client.routes');
const patientsRoutes = require('./app/routes/patient.routes');
const workersRoutes = require('./app/routes/worker.routes');
const chartsRoutes = require('./app/routes/chart.routes');
const appointmentsRoutes = require('./app/routes/appointment.routes');
const doctorsRoutes = require('./app/routes/doctor.routes');
const sicknessesRoutes = require('./app/routes/sickness.routes');
const treatmentsRoutes = require('./app/routes/treatment.routes');
const vaccinationsRoutes = require('./app/routes/vaccination.routes');
const prescriptionsRoutes = require('./app/routes/prescription.routes');

const HttpError = require('./app/utils/http-error');

const app = express();

app.use(bodyParser.json());

const corsOptions = {
    origin: process.env.FRONTEND_URL
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require('./app/models');
db.sequelize.sync()
    .then(() => {
        console.debug("Synced db.");
    })
    .catch((err) => {
        console.debug("Failed to sync db: " + err.message);
    });

app.use('/api/auth', workersRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/charts', chartsRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/sicknesses', sicknessesRoutes);
app.use('/api/treatments', treatmentsRoutes);
app.use('/api/vaccinations', vaccinationsRoutes);
app.use('/api/prescriptions', prescriptionsRoutes);

app.use(() => {
    throw new HttpError('Could not find this route.', 404);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
