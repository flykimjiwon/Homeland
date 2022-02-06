package com.ssafy.homeland.api.service.room;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Slf4j
@Service
public class RoomService {

    private final ConcurrentMap<String, Room> rooms = new ConcurrentHashMap<>();

    public Room findRoom(String roomId){
        return rooms.get(roomId);
    }

    public void removeRoom(String roomId){
        rooms.remove(roomId);
    }

    public Room putRoom(String roomId){
        Room room=new Room(roomId);
        rooms.put(roomId,room);
        return room;
    }


}
