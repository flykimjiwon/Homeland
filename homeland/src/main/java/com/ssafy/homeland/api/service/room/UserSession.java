//package com.ssafy.homeland.api.service.room;
//
//import java.io.Closeable;
//import java.io.IOException;
//import java.util.concurrent.ConcurrentHashMap;
//import java.util.concurrent.ConcurrentMap;
//
//import org.kurento.client.Continuation;
//import org.kurento.client.EventListener;
//import org.kurento.client.IceCandidate;
//import org.kurento.client.IceCandidateFoundEvent;
//import org.kurento.client.MediaPipeline;
//import org.kurento.client.WebRtcEndpoint;
//import org.kurento.jsonrpc.JsonUtils;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.web.socket.TextMessage;
//import org.springframework.web.socket.WebSocketSession;
//
//import com.google.gson.JsonObject;
//
///**
// *
// * @author Ivan Gracia (izanmail@gmail.com)
// * @since 4.3.1
// */
//public class UserSession implements Closeable {
//
//    private static final Logger log = LoggerFactory.getLogger(UserSession.class);
//
//    private final String name; //닉네임
//    private final WebSocketSession session; //소켓세션
//    private final MediaPipeline pipeline; //참여할 방의 파이프라인
//    private final String roomName; // 참여하는 방 이름
//    private final WebRtcEndpoint outgoingMedia; //나의 EndPoint
//    private final ConcurrentMap<String, WebRtcEndpoint> incomingMedia = new ConcurrentHashMap<>();// 다른 사람들의 EndPoint
//
//    //UserSession 생성자, 닉네임, 방이름, 웹소켓 세션, 파이프라인을 주입받음
//    public UserSession(final String name, String roomName, final WebSocketSession session,
//                       MediaPipeline pipeline) {
//        System.out.println("UserSession.UserSession");
//        this.pipeline = pipeline;
//        this.name = name;
//        this.session = session;
//        this.roomName = roomName;
//        this.outgoingMedia = new WebRtcEndpoint.Builder(pipeline).build();//파이프라인에 EndPoint를 생성
//
//        //EndPoint에 리스너를 등록해서 STUN/TRUN 서버를 통해 IceCandidate를 찾으면 클라이언트에게 전송
//        this.outgoingMedia.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {
//            @Override
//            public void onEvent(IceCandidateFoundEvent event) {
//                System.out.println("UserSession.onEvent");
//                JsonObject response = new JsonObject();
//                response.addProperty("id", "iceCandidate");//id:iceCandidate를 보내면 클라이언트가 받음
//                response.addProperty("name", name);
//                response.add("candidate", JsonUtils.toJsonObject(event.getCandidate()));
//                try {
//                    synchronized (session) {
//                        session.sendMessage(new TextMessage(response.toString()));//클라이언트한테 찾았다고 메시지 보냄
//                    }
//                } catch (IOException e) {
//                    log.debug(e.getMessage());
//                }
//            }
//        });
//    }
//
//    public WebRtcEndpoint getOutgoingWebRtcPeer() {
//        return outgoingMedia;
//    } //getter
//
//    public String getName() {
//        return name;
//    } //getter
//
//    public WebSocketSession getSession() {
//        return session;
//    } //getter
//
//    /**
//     * The room to which the user is currently attending.
//     *
//     * @return The room
//     */
//    public String getRoomName() {
//        return this.roomName;
//    } //getter
//
//    //방의 다른 참가자가 들어오면 서버가(RooM에서) 해당 방의 모든 기존 클라이언트에게 newParticipantArrived를 보내고
//    // newParticipantArrived를 받은 다른 기존 클라이언트들은 receiveVideoFrom(sdpOffer)을 보냄
//    // 그러면 이 함수가 실행되면서
//    // sdpOffer를 받아 협상하고 Answer 응답을 보냄
//    // 그다음 ice candidate를 모음?
//    public void receiveVideoFrom(UserSession sender, String sdpOffer) throws IOException {
//        System.out.println("UserSession.receiveVideoFrom");
//        log.info("USER {}: connecting with {} in room {}", this.name, sender.getName(), this.roomName);
//
//        log.trace("USER {}: SdpOffer for {} is {}", this.name, sender.getName(), sdpOffer);
//
//        final String ipSdpAnswer = this.getEndpointForUser(sender).processOffer(sdpOffer);
//        final JsonObject scParams = new JsonObject();
//        scParams.addProperty("id", "receiveVideoAnswer");
//        scParams.addProperty("name", sender.getName());
//        scParams.addProperty("sdpAnswer", ipSdpAnswer);
//
//        log.trace("USER {}: SdpAnswer for {} is {}", this.name, sender.getName(), ipSdpAnswer);
//        this.sendMessage(scParams);
//        log.debug("gather candidates");
//        this.getEndpointForUser(sender).gatherCandidates(); //센더의 엔드포인트에 후보자를 모음
//    }
//
//    private WebRtcEndpoint getEndpointForUser(final UserSession sender) {
//        System.out.println("UserSession.getEndpointForUser");
//        //센더가 자신과 같으면 loopback이 됨
//        if (sender.getName().equals(name)) {
//            System.out.println("UserSession.loofBack");
//            log.debug("PARTICIPANT {}: configuring loopback", this.name);
//            return outgoingMedia;
//        }
//
//        log.debug("PARTICIPANT {}: receiving video from {}", this.name, sender.getName());
//
//        WebRtcEndpoint incoming = incomingMedia.get(sender.getName());
//
//        //센더의 Endpoint가 없으면 엔드포인트를 생성해서 incomingMedia에 넣음
//        if (incoming == null) {
//            System.out.printf("PARTICIPANT {}: creating new endpoint for {}\n", this.name, sender.getName());
//            log.debug("PARTICIPANT {}: creating new endpoint for {}", this.name, sender.getName());
//            incoming = new WebRtcEndpoint.Builder(pipeline).build();
//
//            incoming.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {
//
//                @Override
//                public void onEvent(IceCandidateFoundEvent event) {
//                    JsonObject response = new JsonObject();
//                    response.addProperty("id", "iceCandidate");
//                    response.addProperty("name", sender.getName());
//                    response.add("candidate", JsonUtils.toJsonObject(event.getCandidate()));
//                    try {
//                        synchronized (session) {
//                            session.sendMessage(new TextMessage(response.toString()));
//                        }
//                    } catch (IOException e) {
//                        log.debug(e.getMessage());
//                    }
//                }
//            });
//
//            incomingMedia.put(sender.getName(), incoming);
//        }
//
//        log.debug("PARTICIPANT {}: obtained endpoint for {}", this.name, sender.getName());
//        sender.getOutgoingWebRtcPeer().connect(incoming);
//
//        return incoming;
//    }
//
//    public void cancelVideoFrom(final UserSession sender) {
//        this.cancelVideoFrom(sender.getName());
//    }
//
//    public void cancelVideoFrom(final String senderName) {
//        log.debug("PARTICIPANT {}: canceling video reception from {}", this.name, senderName);
//        final WebRtcEndpoint incoming = incomingMedia.remove(senderName);
//
//        log.debug("PARTICIPANT {}: removing endpoint for {}", this.name, senderName);
//        incoming.release(new Continuation<Void>() {
//            @Override
//            public void onSuccess(Void result) throws Exception {
//                log.trace("PARTICIPANT {}: Released successfully incoming EP for {}",
//                        UserSession.this.name, senderName);
//            }
//
//            @Override
//            public void onError(Throwable cause) throws Exception {
//                log.warn("PARTICIPANT {}: Could not release incoming EP for {}", UserSession.this.name,
//                        senderName);
//            }
//        });
//    }
//
//    @Override
//    public void close() throws IOException {
//        log.debug("PARTICIPANT {}: Releasing resources", this.name);
//        for (final String remoteParticipantName : incomingMedia.keySet()) {
//
//            log.trace("PARTICIPANT {}: Released incoming EP for {}", this.name, remoteParticipantName);
//
//            final WebRtcEndpoint ep = this.incomingMedia.get(remoteParticipantName);
//
//            ep.release(new Continuation<Void>() {
//
//                @Override
//                public void onSuccess(Void result) throws Exception {
//                    log.trace("PARTICIPANT {}: Released successfully incoming EP for {}",
//                            UserSession.this.name, remoteParticipantName);
//                }
//
//                @Override
//                public void onError(Throwable cause) throws Exception {
//                    log.warn("PARTICIPANT {}: Could not release incoming EP for {}", UserSession.this.name,
//                            remoteParticipantName);
//                }
//            });
//        }
//
//        outgoingMedia.release(new Continuation<Void>() {
//
//            @Override
//            public void onSuccess(Void result) throws Exception {
//                log.trace("PARTICIPANT {}: Released outgoing EP", UserSession.this.name);
//            }
//
//            @Override
//            public void onError(Throwable cause) throws Exception {
//                log.warn("USER {}: Could not release outgoing EP", UserSession.this.name);
//            }
//        });
//    }
//
//    public void sendMessage(JsonObject message) throws IOException {
//        System.out.println("UserSession.sendMessage");
//        log.debug("USER {}: Sending message {}", name, message);
//        synchronized (session) {
//            session.sendMessage(new TextMessage(message.toString()));
//        }
//    }
//
//    public void addCandidate(IceCandidate candidate, String name) {
//        System.out.println("UserSession.addCandidate");
//        if (this.name.compareTo(name) == 0) {
//            outgoingMedia.addIceCandidate(candidate);
//        } else {
//            WebRtcEndpoint webRtc = incomingMedia.get(name);
//            if (webRtc != null) {
//                webRtc.addIceCandidate(candidate);
//            }
//        }
//    }
//
//    /*
//     * (non-Javadoc)
//     *
//     * @see java.lang.Object#equals(java.lang.Object)
//     */
//    @Override
//    public boolean equals(Object obj) {
//
//        if (this == obj) {
//            return true;
//        }
//        if (obj == null || !(obj instanceof UserSession)) {
//            return false;
//        }
//        UserSession other = (UserSession) obj;
//        boolean eq = name.equals(other.name);
//        eq &= roomName.equals(other.roomName);
//        return eq;
//    }
//
//    /*
//     * (non-Javadoc)
//     *
//     * @see java.lang.Object#hashCode()
//     */
//    @Override
//    public int hashCode() {
//        int result = 1;
//        result = 31 * result + name.hashCode();
//        result = 31 * result + roomName.hashCode();
//        return result;
//    }
//}