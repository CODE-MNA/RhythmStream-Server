# RythmStream-Server
Node JS server for communication for rhythm stream games using socket io library. Made for the Unity game "Rhythm Stream" in 3 days,
Link to Unity Repo : ``` https://github.com/CODE-MNA/RythmStream_Unity ```

- Note Maker - ```Player that is going to move around the level and based on the current position of the maker player, starts ahead of player```

- Player -  ```The actual player who is going to click the notes being spawned on the screen to score.```

# Socket Events

- StartAsMaker - ```Event occurs when a client is playing as the note maker joins a room.```
- StartAsPlayer - ```Event occurs when a player playing as the one who will click the notes to score joins a room.```

- GetTimings - ```Event sent by client to server requesting the timings of a song.```
- Timings - ```Response Event sent with data about the song's note timings in the currently loaded level in the room.```

- PlayingStart - ```Event sent when note maker has sent a bit of notes to the server and now the player can start playing.```
- NewNote - ```Event occurs when the note maker sends data based on it's position in the game, this is then transferred to the player.```

# Improvements

As this game backend was made in 3 days along with the Unity game client, and this was my first time building a real-time application
here are some key improvements I would make.

- Decouple storage from the webserver
- Implement an Event file which stores all events with proper documentation.
- Extract room management to another service and ensure one service is just concerned with establishing web-socket connections.
- Implement HTTP endpoints instead of WS for data about the timings data and song data that is requested by the maker.
