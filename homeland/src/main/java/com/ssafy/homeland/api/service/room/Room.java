package com.ssafy.homeland.api.service.room;


import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;


import com.ssafy.homeland.db.entity.Participant;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * @author Ivan Gracia (izanmail@gmail.com)
 * @since 4.3.1
 */
@Getter
@Setter
public class Room  {
    private final Logger log = LoggerFactory.getLogger(Room.class);
    private final int joinLimit=6;

    private final ConcurrentMap<String, Participant> participants = new ConcurrentHashMap<>();
    private final String roomId;
    private int joinCnt=0;
    private Participant Host;


    public Room(String roomId) {
        this.roomId = roomId;
        log.info("ROOM {} has been created", roomId);
    }

    public boolean addParticipant(Participant participant){
        if(this.joinCnt>=6) {
            log.debug("room {} is pull",this.getRoomId());
            return false;
        }
        this.participants.put(participant.getNickname(),participant);
        this.joinCnt++;
        log.debug("current joinCnt {}",this.getJoinCnt());
        return true;
    }

    public int removeParticipant(String nickName){
        if(participants.containsKey(nickName)) {
            this.participants.remove(nickName);
            return --joinCnt;
        }
        return -1;
    }

    public Participant findOneParticipantByNickName(String nickName){
        return this.participants.get(nickName);
    }

    public List<Participant> findAllParticipant(){
        return new ArrayList<>(this.participants.values());
    }

}
