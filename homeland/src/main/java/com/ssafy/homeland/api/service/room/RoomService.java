package com.ssafy.homeland.api.service.room;

import com.ssafy.homeland.db.entity.Participant;
import org.springframework.http.ResponseEntity;


public interface RoomService {

    Room getRoom(String roomId);

    ResponseEntity createRoom();

    ResponseEntity findRoom(String roomId);

    void removeRoom(String roomId);

    Room createAndPutRoom(String roomId);

    boolean findRoomInOV(String roomId);

    String generateRandomRoomId();

    String getRandomRoomId();

    boolean joinRoom(Participant participant);

}
