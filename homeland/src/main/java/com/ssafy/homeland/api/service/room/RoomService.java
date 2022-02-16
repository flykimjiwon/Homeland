package com.ssafy.homeland.api.service.room;

import com.ssafy.homeland.api.response.room.RoomInfoRes;
import com.ssafy.homeland.db.entity.Participant;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;


public interface RoomService {

    Room getRoom(String roomId);

//    ResponseEntity createRoom();

    ResponseEntity findRoom(String roomId);

    void removeRoom(String roomId);

    Room createAndPutRoom(String roomId,boolean randomJoin);

    boolean findRoomInOV(String roomId);

    String generateRandomRoomId();

    String getRandomRoomId();

    boolean joinRoom(Participant participant);

    boolean checkNicknameDuplicate(String roomId,String nickname);

    void leaveRoom(String roomId, String nickname);

    void destroyRoom(String roomId, String nickname);

    String findRandomRoom();

    ArrayList<RoomInfoRes> getRoomList();

    RoomInfoRes getRoomInfo(String roomId);

}
