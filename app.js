const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./database');
const utils = require('./utils');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/login', function(req, res){
    let user = req.query.user;
    let pw = req.query.password;
    let doctors = database.getDoctors();
    let returnCode =  {status: 400};
    doctors.some(function(doctor){
        if (doctor.login == user && doctor.password == pw) {
            returnCode =  {status: 200, id: doctor.id};
        }
    });
    res.json(returnCode);
});

app.get('/schedule_resume', function(req, res){
    let medico_id = req.query.medico_id;
    let date = req.query.data; // 2019-07-01

    let returnCode =  {status: 400};
    let data = database.getSchedule(medico_id, date);
    let date_already_inserted = [];

    if (medico_id && date) {
        let resume = [];
        let i = 0;
        for (var item of data){
            if (date_already_inserted.includes(item.date)){
                if (item.patient_id != '') resume[i - 1].patients += 1;
                else resume[i - 1].free += 1;
            }
            else {                
                let temp_hash = {
                    patients: ((item.patient_id != '') ? 1 : 0),
                    free: ((item.patient_id == '') ? 1 : 0),
                    date: item.date
                }
                date_already_inserted.push(item.date);
                resume.push(temp_hash);
                i += 1;
            }
        }
        let treatedResume = new Array();
        for (var item of resume){
            treatedResume.push({
                start: item.date, 
                title: `${item.patients} Pacientes`, 
                backgroundColor: '#b71c1c',
                borderColor: "#b71c1c",
                textColor: '#ffffff',

            });
            treatedResume.push({
                start: item.date, 
                title: `${item.free} Livres`,
                backgroundColor: '#00e676',
                borderColor: "#00e676", 
                textColor: '#000000',

            });
        }
        returnCode = {status: 200, data: treatedResume};
    }

    res.json(returnCode);
});

app.get('/schedule', function(req, res){
    let doctor_id = req.query.medico_id;
    let date = req.query.data;
    let situations = req.query.situations; // ['ocupado', 'livre', 'faltas']

    let status = 200;
    let returnCode = {status: status, data: []} ;

    if (doctor_id && date){
        resume = database.getDaySchedule(doctor_id, date);
        returnCode = {status: 200, data: resume};
    }
    else status = 400;

    res.json(returnCode);
});

app.listen(8099, () => console.log('Servidor rodando na porta 8099.'));
