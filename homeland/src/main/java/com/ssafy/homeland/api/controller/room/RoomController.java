package com.ssafy.homeland.api.controller.room;

import com.ssafy.homeland.api.request.room.ParticipantPostReq;
import com.ssafy.homeland.api.service.room.RoomService;
import com.ssafy.homeland.db.entity.Participant;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@Api(value = "방 관련 API", tags={"Room"})
@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/room")
public class RoomController {

    private final Logger log = LoggerFactory.getLogger(RoomController.class);

    @Autowired
    RoomService roomService;


//    //방 만들기
//    @ApiOperation(value = "방 생성하기",notes = "방을 생성하기 위해 중복되지 않은 랜덤 방 코드를 리턴해준다.")
//    @ApiResponses(
//        value = {
//            @ApiResponse(code=200,message = "성공")
//        }
//    )
//    @GetMapping()
//    public ResponseEntity createRoom(){
//        return roomService.createRoom();
//    }


   //조인할 때 해당 방이 있는지 없는지 리턴
    @ApiOperation(value = "해당 방이 있나?",notes = "현재 조인하고자 하는 방이 존재하는지 판단")
    @ApiResponses(
            value = {
                    @ApiResponse(code=200, message = "성공"),
                    @ApiResponse(code = 404, message = "해당 방을 찾을 수 없음")
            }

    )
    @GetMapping("/{roomId}")
    public ResponseEntity findRoom(@ApiParam(value = "조인 할 방 코드",required = true) @PathVariable String roomId) {
        return roomService.findRoom(roomId);
    }


    //프론트에서 오픈비두에 방을 생성했으면 백엔드에게 알려서 백엔드에도 생성하고 해당 유저를 호스트로 한다.
    @ApiOperation(value = "방을 생성한 후 서버에 해당 방을 저장 및 호스트 지정",notes = "방을 생성한 후 백엔드 서버에도 저장, 호스트 지정")
    @ApiResponses(value = {
            @ApiResponse(code = 200,message = "성공"),
            @ApiResponse(code = 404,message = "해당 방이 오픈비두 서버에 없음"),
            @ApiResponse(code = 406,message = "방에 참여할 수 없음")
    })
    @PutMapping("/{roomId}")
    public ResponseEntity createRoom(@ApiParam(value = "오픈비두 서버에 생성한 방 코드",required = true) @PathVariable String roomId,
                                     @ApiParam(value = "방을 만든 호스트 정보") @RequestBody ParticipantPostReq participantPostReq){
        if(roomService.findRoomInOV(roomId)==false){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        roomService.createAndPutRoom(roomId);

        Participant participant=new Participant();
        participant.setRoomId(roomId);
        participant.setConnectionId(participantPostReq.getConnectionId());
        participant.setNickname(participantPostReq.getNickname());
        participant.setUserId(participantPostReq.getUserId());
        if(roomService.joinRoom(participant)) {
            roomService.getRoom(roomId).setHost(participant);
            return new ResponseEntity(HttpStatus.OK);
        }
        else return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);

    }




    //방 만들기전에 방 코드를 받음
    @ApiOperation(value = "방 생성하기 위한 방 코드",notes = "방을 생성하기 위해 중복되지 않은 랜덤 방 코드를 리턴해준다.")
    @ApiResponses(
            value = {
                    @ApiResponse(code=200,message = "성공")
            }
    )
    @GetMapping("/create")
    public ResponseEntity beForeCreateRoom(){
        String roomId=roomService.getRandomRoomId();
        return new ResponseEntity(roomId,HttpStatus.OK);
    }



    //존재하는 방에 참여하기
    @ApiOperation(value = "특정 방에 조인",notes = "특정 방이 존재하는지 체크, 해당 닉네임이 중복되는지 확인")
    @ApiResponses(value = {
            @ApiResponse(code = 200,message = "성공"),
            @ApiResponse(code = 226,message = "닉네임 중복"),
            @ApiResponse(code = 404,message = "해당 방이 오픈비두 서버에 없음"),
            @ApiResponse(code = 406,message = "인원 초과 참여할 수 없음")
    })
    @PostMapping("/join/{roomId}")
    public ResponseEntity joinRoom(@PathVariable String roomId, @RequestBody ParticipantPostReq participantPostReq){

        if(roomService.findRoomInOV(roomId)==false){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        if(roomService.checkNicknameDuplicate(roomId,participantPostReq.getNickname())==true){
            return new ResponseEntity(HttpStatus.IM_USED); //코드 226
        }

        Participant participant=new Participant();
        participant.setRoomId(roomId);
        participant.setConnectionId(participantPostReq.getConnectionId());
        participant.setNickname(participantPostReq.getNickname());
        participant.setUserId(participantPostReq.getUserId());
        if(roomService.joinRoom(participant))
            return new ResponseEntity(HttpStatus.OK);
        else return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE); //코드 406
    }

    @PostMapping("/leave/{roomId}")
    public ResponseEntity leaveRoom(@PathVariable String roomId, @RequestBody ParticipantPostReq participantPostReq){
        roomService.leaveRoom(roomId,participantPostReq.getNickname());
        return new ResponseEntity(HttpStatus.OK);
    }


}
