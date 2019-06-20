const data = require('./data.json');

exports.getDoctors = () => data.doctors;

exports.getSchedule = (doctor_id, date) => {
    return data.schedule.filter(function(row){
        let d =  date.split('/');
        return (row.doctor_id == doctor_id &&
                row.date.indexOf(`${d[1]}-${d[2]}`) != -1);
    });
};