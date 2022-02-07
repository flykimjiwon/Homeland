package com.ssafy.homeland.api.controller.room;

import com.ssafy.homeland.api.request.room.ParticipantPostReq;
import com.ssafy.homeland.api.service.room.Room;
import com.ssafy.homeland.api.service.room.RoomService;
import com.ssafy.homeland.db.entity.Participant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;




@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/room")
public class RoomController {

    private final Logger log = LoggerFactory.getLogger(RoomController.class);

    @Autowired
    RoomService roomService;


    //방 만들기
    @GetMapping()
    public ResponseEntity createRoom(){
        return roomService.createRoom();
    }


   //조인할 때 해당 방이 있는지 없는지 리턴
    @GetMapping("/{roomId}")
    public ResponseEntity findRoom(@PathVariable String roomId) {
        return roomService.findRoom(roomId);
    }


    //프론트에서 오픈비두에 방을 생성했으면 백엔드에게 알려서 백엔드에도 생성하고 해당 유저를 호스트로 한다.
    @PutMapping("/{roomId}")
    public ResponseEntity createRoom(@PathVariable String roomId, @RequestBody ParticipantPostReq participantPostReq){
        if(roomService.findRoomInOV(roomId)==false){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        roomService.createAndPutRoom(roomId);

        Participant participant=new Participant();
        participant.setRoomId(roomId);
        participant.setConnectionId(participantPostReq.getConnectionId());
        participant.setNickName(participantPostReq.getNickName());
        participant.setUserId(participantPostReq.getUserId());
        if(roomService.joinRoom(participant)) {
            roomService.getRoom(roomId).setHost(participant);
            return new ResponseEntity(HttpStatus.OK);
        }
        else return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);

    }

    @GetMapping("/create")
    public ResponseEntity beForeCreateRoom(){
        String roomId=roomService.getRandomRoomId();
        return new ResponseEntity(roomId,HttpStatus.OK);
    }



    //존재하는 방에 참여하기
    @PostMapping("/join/{roomId}")
    public ResponseEntity joinRoom(@PathVariable String roomId, @RequestBody ParticipantPostReq participantPostReq){

        if(roomService.findRoomInOV(roomId)==false){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        Participant participant=new Participant();
        participant.setRoomId(roomId);
        participant.setConnectionId(participantPostReq.getConnectionId());
        participant.setNickName(participantPostReq.getNickName());
        participant.setUserId(participantPostReq.getUserId());
        if(roomService.joinRoom(participant))
            return new ResponseEntity(HttpStatus.OK);
        else return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
    }




}
