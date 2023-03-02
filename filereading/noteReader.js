const fs = require('fs');

    let GetNoteTiming = (noteNumber)=>{
        let data = fs.readFileSync(`${__dirname}\\WF_Endgame.rdat`,'utf-8');

        let timings = data.split('\r\n')


        return parseFloat(timings[noteNumber])
    }

    let GetAllTimings = ()=>{
        let data = fs.readFileSync(`${__dirname}\\WF_Endgame.rdat`,'utf-8');

        let timings = data.split('\r\n')

        return timings
    }

module.exports = {
    getAllTimings : GetAllTimings,
    getNoteTiming : GetNoteTiming
}