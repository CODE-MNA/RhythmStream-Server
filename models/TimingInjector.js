// use another module to read note timings
const noteReader = require('../filereading/noteReader')

//Returns noteData
const InjectTimings = (noteData )=>{
    
   
    let index = parseInt(noteData.noteNumber);

    let time = noteReader.getNoteTiming(index)
    noteData.noteTimeInSong = time;
    
    return noteData;
}


module.exports = {
    injectTimingIntoNoteData : InjectTimings
}