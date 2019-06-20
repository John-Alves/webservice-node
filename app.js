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
    let date = req.query.data; // 07/2019

    let returnCode =  {status: 400};
    let data = database.getSchedule(medico_id, date);
    let weekdays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
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
                var parts = item.date.split('-');
                let date_obj = new Date(parts[2], parts[1] - 1, parts[0]);
                
                let temp_hash = {
                    weekday: weekdays[date_obj.getDay()],
                    monthday: `${utils.leftPad((date_obj.getDate() + 1), 2)}`,
                    patients: ((item.patient_id != '') ? 1 : 0),
                    free: ((item.patient_id == '') ? 1 : 0),
                }
                date_already_inserted.push(item.date);
                resume.push(temp_hash);
                i += 1;
            }
        }
        returnCode = {status: 200, data: resume};
    }

    res.json(returnCode);
});

app.get('/schedule_day_detail', function(req, res){
    var medico_id = req.query.medico_id;
    var date = req.query.data; // 01/07/2019
    var situations = req.query.situations; // ['ocupado', 'livre', 'faltas']

    var status = 200;
    var data = [];

    if (medico_id && date){
        data = [
            { patient: 'Johnny 01', date: '13/06/2019', start: '07:12', end: '07:30', exam: 'CONSULTA OTORRINO' },
            { patient: 'Johnny 02', date: '13/06/2019', start: '07:15', end: '07:45', exam: 'CONSULTA NEUROLOGISTA'  },
            { patient: 'Johnny 03', date: '13/06/2019', start: '10:17', end: '10:30', exam: 'CONSULTA NEFROLOGISTA'  },
            { patient: 'Johnny 04', date: '13/06/2019', start: '10:30', end: '10:50', exam: 'CONSULTA ENDOCRINOLOGISTA'  },
            { patient: 'Johnny 05', date: '13/06/2019', start: '14:10', end: '14:20', exam: 'CONSULTA OTORRINO'  },
            { patient: 'Johnny 06', date: '13/06/2019', start: '14:13', end: '15:30', exam: 'CONSULTA OTORRINO'  }
        ];
    }
    else status = 400;

    res.json( {status: status, data: data} );
});

app.listen(8099, () => console.log('Servidor rodando na porta 8099.'));
