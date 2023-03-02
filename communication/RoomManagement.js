

class GameRoom {
        playerSocket;
        makerSocket;
        roomName;

        constructor(roomName, socket , isMaker) {
            
            this.playingAlready = false;
            if(isMaker) {
                this.makerSocket = socket;
            }else{
                this.playerSocket = socket;
            }
            this.roomName = roomName;
            socket.join(roomName);

        }
        //Called when someone sends message to join this rooom
        OnJoinAsMaker = (socket,p) =>{   
            socket.join(this.roomName);
            this.makerSocket = socket;
            this.playerSocket = p;
            return this;
        }

        OnJoinAsPlayer = (socket) =>{
            socket.join(this.roomName);
            this.playerSocket = socket;
            
            return this;
        }
        
        HasPlayer = () =>{
            if(typeof this.playerSocket === 'undefined'){
                return false;
            }
            return true;
        }

        
}

//Array of rooms
class RoomManager {
    allRooms;

    constructor(){
        this.allRooms = [];
    }


    getRoomsString(){
        let output = "";
        this.allRooms.forEach(element => {
            output += element.roomName + "\n"
        });
        return output;
    }

    //<summary>Returns the game room joined</summary>
    TryJoiningRoomAsMaker = (makerSocket,roomName) =>{
        let cache;
        this.allRooms.forEach((element) => {
            if(element.roomName === roomName){
                if(typeof element.makerSocket === 'undefined'){
                    element = element.OnJoinAsMaker(makerSocket,element.playerSocket)
                    console.log("samenameee")
                    cache = element;
                }else{
                    throw new Error("Couldn't join room : Maker already joined")
                }
            }
        });

        if(typeof cache !== 'undefined'){
            console.log("cache is full")
            return cache
        }
        
        let newRoom = new GameRoom(roomName,makerSocket,true);
        this.allRooms.push(newRoom);

        return newRoom;

    }

    
    TryJoiningRoomAsPlayer = (playerSocket,roomName) =>{
    
        this.allRooms.forEach((element) => {
            if(element.roomName === roomName){
                if(typeof element.playerSocket === 'undefined'){
                    element = element.OnJoinAsPlayer(playerSocket)
                    return element;
                }else{
                    throw new Error("Couldn't join room : Player already joined'")
                    
                }
            }
        });

        let newRoom = new GameRoom(roomName,playerSocket,false);
       
        this.allRooms.push(newRoom);

        return newRoom

    }
}


module.exports = {
    RoomManager : RoomManager,
    GameRoom : GameRoom
}