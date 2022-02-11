package com.ssafy.homeland.api.response.room;


import com.ssafy.homeland.db.entity.Participant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@AllArgsConstructor
public class RoomInfoRes {

    final String roomId;
    final String hostId;
    final Integer currentParticipantCnt;
    final boolean randomJoin;
    final ArrayList<Participant> participants;

}
