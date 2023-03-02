const screen = require('./screen')

//Returns NoteData with positions filled with random
const InjectRandomPosition = (noteData) =>{
    
    let x = Math.random(screen.getXMin,screen.getXMax)

    let y = Math.random(screen.getYMin,screen.getYMax)

    noteData.x = x
    noteData.y = y

    return noteData

}



module.exports.default = {

}

