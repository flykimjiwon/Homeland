package com.ssafy.homeland.api.controller.member;

import com.ssafy.homeland.api.request.member.UserCheckPwReq;
import com.ssafy.homeland.api.request.member.UserLoginPostReq;
import com.ssafy.homeland.api.response.member.UserLoginPostRes;
import com.ssafy.homeland.api.service.member.UserService;
import com.ssafy.homeland.common.auth.SsafyUserDetails;
import com.ssafy.homeland.common.model.response.BaseResponseBody;
import com.ssafy.homeland.common.util.JwtTokenUtil;
import com.ssafy.homeland.db.entity.User;
import com.ssafy.homeland.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Map;
import java.util.Optional;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth"})
@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/auth")
public class AuthController {
	@Autowired
	UserService userService;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	UserRepositorySupport userRepositorySupport;
	
	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.") 
    @ApiResponses(value = {
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
	})
	public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
		String userId = loginInfo.getId();
		String password = loginInfo.getPassword();
		
		Optional<User> optionalUser = userRepositorySupport.findUserByUserId(userId);
		if(optionalUser.isEmpty()) {
			return ResponseEntity.status(404).body(UserLoginPostRes.of(404, "ID doesn't exist", null));
		} else {
			User user = optionalUser.get();
			// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
			if(passwordEncoder.matches(password, user.getPassword())) {
				// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
				return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userId)));
			}
			// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
			return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
		}



	}


	@ApiOperation(value = "비밀번호 체크", notes = "현재 로그인한 사용자와 제출한 비밀번호가 똑같은지 체크한다")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/check-password")
	public ResponseEntity checkPassword(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value="체크할 비밀번호", required = true) UserCheckPwReq userCheckPwReq) {
		String password = userCheckPwReq.getPassword();
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		if(passwordEncoder.matches(password, user.getPassword())) {
			return new ResponseEntity(HttpStatus.OK);
		}
		return new ResponseEntity(HttpStatus.UNAUTHORIZED);

	}
}
