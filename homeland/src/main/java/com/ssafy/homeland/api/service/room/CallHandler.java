package com.ssafy.homeland.api.service.room;

import java.io.IOException;

import org.kurento.client.IceCandidate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

/**
 *
 * @author Ivan Gracia (izanmail@gmail.com)
 * @since 4.3.1
 */
public class CallHandler extends TextWebSocketHandler {

    private static final Logger log = LoggerFactory.getLogger(CallHandler.class);

    private static final Gson gson = new GsonBuilder().create();

    //방들을 관리하는 빈
    @Autowired
    private RoomManager roomManager;

    //UserSession을 관리하는 빈
    @Autowired
    private UserRegistry registry;

    //프론트와 클라이언트로부터 요청을 받고 처리하는 주요 메서드
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        //요청을 받고 message를 json객체로 변환함
        final JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);

        System.out.println("CallHandler.handleTextMessage");

        //UserRegistry에 요청 세션을 갖는 유저가 있는지 찾음
        final UserSession user = registry.getBySession(session);

        //registry에 등록되지 않은 세션의 경우 null이 반환된다.
        if (user != null) {
            log.debug("Incoming message from user '{}': {}", user.getName(), jsonMessage);
        } else {
            log.debug("Incoming message from new user: {}", jsonMessage);
        }

        //요청 메시지의 id에 따라 각기 다른 함수처리
        switch (jsonMessage.get("id").getAsString()) {

            case "createRoom":
                createRoom(jsonMessage,session);
                break;
            case "joinRoom"://방 참여 요청
                System.out.println("CallHandler.joinRoom");
                joinRoom(jsonMessage, session);
                break;
            case "receiveVideoFrom":
                System.out.println("CallHandler.receiveVideoFrom");
                final String senderName = jsonMessage.get("sender").getAsString();
                final UserSession sender = registry.getByName(senderName);
                final String sdpOffer = jsonMessage.get("sdpOffer").getAsString();
                user.receiveVideoFrom(sender, sdpOffer);
                break;
            case "leaveRoom":// 방 떠나기
                System.out.println("CallHandler.leaveRoom");
                leaveRoom(user);
                break;
            case "onIceCandidate": //
                System.out.println("CallHandler.onIceCandidate");
                JsonObject candidate = jsonMessage.get("candidate").getAsJsonObject();

                if (user != null) {
                    IceCandidate cand = new IceCandidate(candidate.get("candidate").getAsString(),
                            candidate.get("sdpMid").getAsString(), candidate.get("sdpMLineIndex").getAsInt());
                    user.addCandidate(cand, jsonMessage.get("name").getAsString());
                }
                break;
            default:
                break;
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        UserSession user = registry.removeBySession(session);
        roomManager.getRoom(user.getRoomName()).leave(user);
    }

    //방 이름과 닉네임으로 방에 참가
    private void joinRoom(JsonObject params, WebSocketSession session) throws IOException {
        final String roomName = params.get("room").getAsString();
        final String name = params.get("name").getAsString();
        log.info("PARTICIPANT {}: trying to join room {}", name, roomName);

        //기존 방이 존재하면
        Room room = roomManager.getRoom(roomName);
        //유저세션을 만들고 기존 방에 참가
        final UserSession user = room.join(name, session);
        registry.register(user);
    }

    //방 이름과 닉네임으로 방을 생성하고 참가 이때는 방을 만드는 사람 이름만 있으면 됨
    private void createRoom(JsonObject params, WebSocketSession session) throws IOException {
        final String name = params.get("name").getAsString();
        log.info("PARTICIPANT {}: trying to create room ", name);

        //random으로 중복 안되게 roomName을 만듬
        //
        String roomName=makeRoomName();
        Room room = roomManager.createRoom(roomName);
        //유저세션을 만들고 만든 방에 참가
        final UserSession user = room.join(name, session);
        registry.register(user);
    }

    private String makeRoomName() {

        return "tmp";
    }

    //방을 떠남
    private void leaveRoom(UserSession user) throws IOException {
        final Room room = roomManager.getRoom(user.getRoomName());
        room.leave(user);
        //방의 참가자가 모두 나갔다면
        //방을 없앰
        if (room.getParticipants().isEmpty()) {
            roomManager.removeRoom(room);
        }
    }
}
