package com.ssafy.homeland.api.service.member;


import com.ssafy.homeland.api.request.member.UserRegisterPostReq;
import com.ssafy.homeland.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
}
