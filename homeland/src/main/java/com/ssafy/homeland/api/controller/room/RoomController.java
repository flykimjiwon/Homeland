package com.ssafy.homeland.api.controller.room;

import com.ssafy.homeland.api.service.room.Room;
import com.ssafy.homeland.api.service.room.RoomService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


@RestController
@RequestMapping("/api/v1/room")
public class RoomController {

    private final Logger log = LoggerFactory.getLogger(RoomController.class);

    private final String OPENVIDU_URL="https://i6c202.p.ssafy.io/openvidu/";
    private final String OPENVIDU_AUTH="Basic T1BFTlZJRFVBUFA6SE9NRUxBTkQ=";
    @Autowired
    RoomService roomService;

//    //조인할 때 해당 방이 있는지 없는지 리턴
    @GetMapping("/{roomId}")
    public ResponseEntity findRoom(@PathVariable String roomId) {

        //오픈비두 서버에서 해당 방이 있는지 먼저 확인
        System.out.println("요청옴");
        System.out.println(roomId);
        boolean exist = findRoomInOV(roomId);

        if (exist) {
            log.debug("room:{} found in openVidu Server!", roomId);
        } else {
            log.debug("room not found in openVidu Server!");
        }

        Room room = roomService.findRoom(roomId);

        if (exist) {//오픈 비두에 있을 때
            if (room != null) {//찾는 방이 있다면 정상
                log.debug("room:{} found!", room.getName());
                return new ResponseEntity(room.getName(), HttpStatus.OK);
            } else {// 찾는 방이 없다면 비정상-> 메모리에 넣고 리턴
                log.debug("room not found!");
                roomService.putRoom(roomId);
                room=roomService.findRoom(roomId);
                return new ResponseEntity(room.getName(), HttpStatus.OK);
            }
        } else {//오픈 비두에는 없을때
            if (room != null) {//메모리에는 있다면 잘못된거임 메모리에 있는거 삭제
                roomService.removeRoom(roomId);
            } else {// 찾는 방이 없다면 정상
                log.debug("room not found!");
            }
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }


    private boolean findRoomInOV(String roomId) {
        HttpURLConnection connection = null;
        try {
            //Create connection
            URL url = new URL(OPENVIDU_URL+"api/sessions/"+roomId);
            connection = (HttpURLConnection) url.openConnection();

            //오픈비두서버에 보내기위해 헤더값 설정
            connection.setRequestProperty("Authorization",OPENVIDU_AUTH);

            int responseCode = connection.getResponseCode();
            System.out.println("HTTP 응답 코드 : " + responseCode);
            if(responseCode==200)
                return true;
            else return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            if (connection != null) {
                //에러와 관계없이 모든 로직이 끝나면 connection 객체 (HttpURLConnection)를
                // disconnect 하여 모든 연결을 종료합니다.
                connection.disconnect();
            }
        }

//        return true;
    }


}
