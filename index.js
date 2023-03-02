const express = require('express');
const app = express();

const cors = require('cors');

const http = require('http');

app.use(express.json())
app.use(cors("*"))

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{cors:"*"});




const { injectTimingIntoNoteData } = require("../Backend/models/TimingInjector")


const RoomManager = require("../Backend/communication/RoomManagement").RoomManager
const NoteData = require("../Backend/models/notedata");
const { getAllTimings } = require('./filereading/noteReader');
const roomManager = new RoomManager();




io.on('connection', (socket) => {
  console.log('a user connected,');

      socket.on('StartAsMaker',(roomName)=>{

          socket.on('GetTimings',(data)=>{
            console.log("someone wants times")
            let timings = getAllTimings()
            io.to(socket.id).emit("Timings",timings)
          })


        try{
          let joinedRoom = roomManager.TryJoiningRoomAsMaker(socket,roomName)
          io.to(roomName).emit("maker joined")

         

          socket.on('NewNote',(noteJson) => {
          
            
            if(!joinedRoom.HasPlayer()){
                 return;         
            }
            


            try{

              const obj = JSON.parse(noteJson)
              let final = JSON.parse(obj)
              injectTimingIntoNoteData(final)


              
              if(final.noteTimeInSong > 8 && !joinedRoom.playingAlready){
                
                io.to(roomName).emit("PlayingStart")
                joinedRoom.playingAlready = true

              }


              socket.to(roomName).emit("NewNote", JSON.stringify({
                posX : final.posX,
                posY : final.posY,
                noteNumber : final.noteNumber,
                noteTimeInSong : final.noteTimeInSong
  
              }))
          
            }catch{

              injectTimingIntoNoteData(noteJson)

              
              
              if(noteJson.noteTimeInSong > 8 && !joinedRoom.playingAlready){
                
                io.to(roomName).emit("PlayingStart")
                joinedRoom.playingAlready = true

              }

              socket.to(roomName).emit("NewNote", JSON.stringify({
                posX : noteJson.posX,
                posY : noteJson.posY,
                noteNumber : noteJson.noteNumber,
                noteTimeInSong : noteJson.noteTimeInSong
  
              }))
            }

           
           
    
      
        });
    
         
        }catch(err) {
          socket.emit("error", err.message.toString())
          


        }
            
      })

      socket.on('StartAsPlayer',(roomName)=>{
        


        console.log("Some player attempts to join the room: " + roomName)
         try{
          let joinedRoom = roomManager.TryJoiningRoomAsPlayer(socket,roomName)
           io.to(roomName).emit("player joined")
           console.log("player joined room : " + roomName)

     



         }catch(err) {
           socket.emit("error", err.message.toString())
           console.log("error : " + err)
         }
             
       })
 

});





server.listen(3000, () => {
  console.log('listening on *:3000');
});