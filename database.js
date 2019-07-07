const data = require('./data.json');

exports.getDoctors = () => data.doctors;

exports.getSchedule = (doctor_id, date) => {
    return data.schedule.filter(function(row){
        let d =  date.split('-');
        
        return (row.doctor_id == doctor_id &&
                row.date.indexOf(`${d[0]}-${d[1]}`) != -1);
    });
};

exports.getDaySchedule = (doctor_id, date) => {
    let results = data.schedule.filter(function(row){
        // let d =  date.split('-');
        return (row.doctor_id == doctor_id &&
                row.date == date);
    });
    results = joinPatients(results);
    return results;
};

function joinPatients(schedule){
    for (let i = 0; i < schedule.length; i++){
        let patient = data.patients.filter(row => row.id == schedule[i].patient_id);
        let name = '';
        if (patient.length > 0) name = patient[0].name;
        schedule[i].patient = name;
    }
    return schedule;
}