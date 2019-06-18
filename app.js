const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/login', function(req, res){
    if (req.query.user == 'admin@admin' && req.query.pw == 'admin') res.json( {status: 200} );
    else res.json( {status: 400} );
});

app.get('/schedule_resume', function(req, res){
    var medico_id = req.query.medico_id;
    var date = req.query.data; // 07/2019

    var status = 200;
    var data = [];
    if (medico_id && date){
        data = [
            { weekday: 'SEG', monthday: '10', patients: 15, free: 7 },
            { weekday: 'TER', monthday: '11', patients: 10, free: 12 },
            { weekday: 'QUA', monthday: '13', patients: 10, free: 12 },
            { weekday: 'QUI', monthday: '14', patients: 10, free: 12 },
            { weekday: 'SEX', monthday: '15', patients: 10, free: 12 },
            { weekday: 'SAB', monthday: '16', patients: 10, free: 12 },
            { weekday: 'DOM', monthday: '17', patients: 10, free: 12 },
            { weekday: 'SEG', monthday: '18', patients: 10, free: 12 },
            { weekday: 'TER', monthday: '19', patients: 3, free: 7 },
            { weekday: 'QUA', monthday: '20', patients: 10, free: 12 },
            { weekday: 'QUI', monthday: '21', patients: 10, free: 12 },
            { weekday: 'SEX', monthday: '22', patients: 10, free: 12 },
            { weekday: 'SAB', monthday: '23', patients: 10, free: 12 },
            { weekday: 'TER', monthday: '26', patients: 10, free: 12 },
            { weekday: 'QUA', monthday: '27', patients: 10, free: 12 },
            { weekday: 'QUI', monthday: '28', patients: 10, free: 12 },
            { weekday: 'SEX', monthday: '29', patients: 10, free: 12 },
            { weekday: 'SAB', monthday: '30', patients: 10, free: 12 },
            { weekday: 'DOM', monthday: '31', patients: 10, free: 12 }
        ];
    }
    else status = 400;

    res.json( {status: status, data: data} );
});

app.get('/schedule_resume', function(req, res){
    var medico_id = req.query.medico_id;
    var date = req.query.data; // 07/2019

    var status = 200;
    var data = [];
    if (medico_id && date){
        data = [
            { weekday: 'SEG', monthday: '10', patients: 15, free: 7 },
            { weekday: 'TER', monthday: '11', patients: 10, free: 12 },
            { weekday: 'QUA', monthday: '13', patients: 10, free: 12 },
            { weekday: 'QUI', monthday: '14', patients: 10, free: 12 },
            { weekday: 'SEX', monthday: '15', patients: 10, free: 12 },
            { weekday: 'SAB', monthday: '16', patients: 10, free: 12 },
            { weekday: 'DOM', monthday: '17', patients: 10, free: 12 },
            { weekday: 'SEG', monthday: '18', patients: 10, free: 12 },
            { weekday: 'TER', monthday: '19', patients: 3, free: 7 },
            { weekday: 'QUA', monthday: '20', patients: 10, free: 12 },
            { weekday: 'QUI', monthday: '21', patients: 10, free: 12 },
            { weekday: 'SEX', monthday: '22', patients: 10, free: 12 },
            { weekday: 'SAB', monthday: '23', patients: 10, free: 12 },
            { weekday: 'TER', monthday: '26', patients: 10, free: 12 },
            { weekday: 'QUA', monthday: '27', patients: 10, free: 12 },
            { weekday: 'QUI', monthday: '28', patients: 10, free: 12 },
            { weekday: 'SEX', monthday: '29', patients: 10, free: 12 },
            { weekday: 'SAB', monthday: '30', patients: 10, free: 12 },
            { weekday: 'DOM', monthday: '31', patients: 10, free: 12 }
        ];
    }
    else status = 400;

    res.json( {status: status, data: data} );
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
