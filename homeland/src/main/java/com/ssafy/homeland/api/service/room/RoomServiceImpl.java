package com.ssafy.homeland.api.service.room;


import com.ssafy.homeland.api.controller.room.RoomController;
import com.ssafy.homeland.db.entity.Participant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class RoomServiceImpl implements RoomService{

    private final Logger log = LoggerFactory.getLogger(RoomController.class);

    private final String OPENVIDU_URL="https://i6c202.p.ssafy.io/openvidu/";
    private final String OPENVIDU_AUTH="Basic T1BFTlZJRFVBUFA6SE9NRUxBTkQ=";

    private final ConcurrentMap<String, Room> rooms = new ConcurrentHashMap<>();

    public Room getRoom(String roomId){
        return rooms.get(roomId);
    };

    //방 생성하기
    public ResponseEntity createRoom(){

        String roomId=getRandomRoomId();

        boolean exist = findRoomInOV(roomId);

        if(exist) {
            while (findRoomInOV(roomId)) {
                roomId = getRandomRoomId();
            }
        }

        this.createAndPutRoom(roomId);

        return new ResponseEntity(roomId,HttpStatus.OK);
    }

    //오픈비두 서버와 rooms에 해당 방이 있는지 확인
    public ResponseEntity findRoom(String roomId){
        //오픈비두 서버에서 해당 방이 있는지 먼저 확인
        boolean exist = findRoomInOV(roomId);

        if (exist) {
            log.debug("room:{} found in openVidu Server!", roomId);
        } else {
            log.debug("room not found in openVidu Server!");
        }

        // RoomService에서 관리하는 rooms에 해당 룸이 있는지 확인
        Room room = this.getRoom(roomId);

        if (exist) {//오픈 비두에 있을 때
            if (room != null) {//찾는 방이 있다면 정상
                log.debug("room:{} found in memory!", room.getRoomId());
                return new ResponseEntity(room.getRoomId(), HttpStatus.OK);
            } else {// 찾는 방이 없다면 비정상-> 메모리에 넣고 리턴
                log.debug("room not found in memory!");
                this.createAndPutRoom(roomId);
                room=this.getRoom(roomId);
                return new ResponseEntity(room.getRoomId(), HttpStatus.OK);
            }
        } else {//오픈 비두에는 없을때
            if (room != null) {//메모리에는 있다면 잘못된거임 메모리에 있는거 삭제
                this.removeRoom(roomId);
            } else {// 찾는 방이 없다면 정상
                log.debug("room not found in memory!");
            }
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    public void removeRoom(String roomId){
        rooms.remove(roomId);
    }

    @Override
    public Room createAndPutRoom(String roomId) {
        Room room=new Room(roomId);
        rooms.put(roomId,room);
        return room;
    }


    public boolean findRoomInOV(String roomId) {
        HttpURLConnection connection = null;
        try {
            //Create connection
            URL url = new URL(OPENVIDU_URL + "api/sessions/" + roomId);
            connection = (HttpURLConnection) url.openConnection();

            //오픈비두서버에 보내기위해 헤더값 설정
            connection.setRequestProperty("Authorization", OPENVIDU_AUTH);

            int responseCode = connection.getResponseCode();
            log.debug("find room in OpenVidu response code: {}",responseCode);
            if (responseCode == 200)
                return true;
            else return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            if (connection != null) {
                //에러와 관계없이 모든 로직이 끝나면 connection 객체 (HttpURLConnection)를
                // disconnect 하여 모든 연결을 종료
                connection.disconnect();
            }
        }
    }

    public String generateRandomRoomId(){

        StringBuffer roomId = new StringBuffer();
        Random random= new Random();

        roomId.append((char) ((int) (random.nextInt(26)) + 65));
        roomId.append((char) ((int) (random.nextInt(26)) + 65));
        roomId.append(random.nextInt(10));
        roomId.append(random.nextInt(10));
        roomId.append(random.nextInt(10));
        roomId.append(random.nextInt(10));

        return roomId.toString();
    }

    public String getRandomRoomId(){
        String roomId=generateRandomRoomId();

        while(rooms.containsKey(roomId)){
            roomId=generateRandomRoomId();
        };

        return roomId;
    }

    @Override
    public boolean joinRoom(Participant participant) {
        Room room=rooms.get(participant.getRoomId());
        if(room.addParticipant(participant)) {
            log.debug("participant {} joined room {}", participant.getNickName(), participant.getRoomId());
            return true;
        }else {
            log.debug("participant {} can't join room {}", participant.getNickName(), participant.getRoomId());
            return false;
        }
    }

}
