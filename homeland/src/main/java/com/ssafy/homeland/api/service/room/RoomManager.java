package com.ssafy.homeland.api.service.room;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.kurento.client.KurentoClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author Ivan Gracia (izanmail@gmail.com)
 * @since 4.3.1
 */
public class RoomManager {

    private final Logger log = LoggerFactory.getLogger(RoomManager.class);

    @Autowired
    private KurentoClient kurento;

    private final ConcurrentMap<String, Room> rooms = new ConcurrentHashMap<>();

    /**
     * Looks for a room in the active room list.
     *
     * @param roomName the name of the room
     * @return the room if it was already created, or a new one if it is the first time this room is
     * accessed
     */

    //수정: 들어가고자하는 방이 없다면 방을 생성하는것을 하지 않고 null을 반환
    //들어가고자 하는 방이 존재 한다면 해당 방을 반환
    public Room getRoom(String roomName) {
        System.out.println("RoomManager.getRoom");
        log.debug("Searching for room {}", roomName);
        Room room = rooms.get(roomName);

        if (room == null) {
            log.debug("Room {} not existent.", roomName);
            return null;
        }
        log.debug("Room {} found!", roomName);
        return room;
    }


    //만든 함수
    //방을 만들 때 랜덤으로 중복되지 않는 방이름을 만들 수 있게 해야함
    //미정: 초대 코드도 포함?
    public Room createRoom(String roomName) {
        log.debug("Searching for room {}", roomName);
        Room room = rooms.get(roomName);

        if (room != null) {
            log.debug("Room {} already existent.!", roomName);
            return null;
        }

        log.debug("Room {} is created.!", roomName);
        room = new Room(roomName, kurento.createMediaPipeline());
        rooms.put(roomName, room);

        return room;
    }

    /**
     * Removes a room from the list of available rooms.
     *
     * @param room the room to be removed
     */

    //방 제거
    public void removeRoom(Room room) {
        System.out.println("RoomManager.removeRoom");
        this.rooms.remove(room.getName());
        room.close();
        log.info("Room {} removed and closed", room.getName());
    }

}
