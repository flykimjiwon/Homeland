package com.ssafy.homeland.api.controller.member;

import com.ssafy.homeland.api.request.member.UserRegisterPostReq;
import com.ssafy.homeland.api.response.member.UserInfoRes;
import com.ssafy.homeland.api.service.member.EmailService;
import com.ssafy.homeland.api.service.member.UserService;
import com.ssafy.homeland.common.auth.SsafyUserDetails;
import com.ssafy.homeland.common.model.response.BaseResponseBody;
import com.ssafy.homeland.common.util.RedisUtil;
import com.ssafy.homeland.db.entity.User;
import com.ssafy.homeland.db.repository.UserRepository;
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
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

import java.util.*;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/users")
public class UserController {
	
	@Autowired
	UserService userService;

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserRepositorySupport userRepositorySupport;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	EmailService emailService;

	@Autowired
	RedisUtil redisUtil;
	
	@PostMapping()
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {

		User user = userService.createUser(registerInfo);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	@GetMapping("/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })

	public ResponseEntity getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 * 엑세스 토큰이 잘못된 경우 401 에러({"error" : "SignatureVerificationException", :"message: " The Token's Signature resulted invalid when verified using the Algorithm: HmacSHA512"}) 발생
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		UserInfoRes userInfoRes = new UserInfoRes(user);

		return new ResponseEntity<>(userInfoRes,HttpStatus.OK);

	}



	@PutMapping("/edit")
	public ResponseEntity editUserInfo(Authentication authentication, @RequestBody Map<String,Object> body) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		user.setNickname(body.get("nickname").toString());
		user.setEmail(body.get("email").toString());
		userRepository.save(user);
		return new ResponseEntity(HttpStatus.OK);

	}

	@PutMapping("/edit-password")
	public ResponseEntity editPassword(Authentication authentication, @RequestBody Map<String,Object> body) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		user.setPassword(passwordEncoder.encode(body.get("password").toString()));
		userRepository.save(user);
		return new ResponseEntity(HttpStatus.OK);
	}

	@PostMapping("/find-password")
	public ResponseEntity findPassword(@RequestBody Map<String, Object> body) {
		User user = userRepositorySupport.findUserByUserId(body.get("id").toString()).get();
		if (user.getEmail().equals( body.get("email").toString())) {
			UUID uuid = UUID.randomUUID();
			redisUtil.setDataExpire(uuid.toString(),user.getUserId(), 60 * 30L);
			String CHANGE_PASSWORD_LINK = "https://i6c202.p.ssafy.io/find-password/";
			emailService.sendMail(user.getEmail(),"사용자 비밀번호 안내 메일",CHANGE_PASSWORD_LINK+uuid.toString());
			return new ResponseEntity(HttpStatus.OK);
		} else {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}

	}

	@PutMapping("/password/{key}")
	public ResponseEntity changePassword(@PathVariable String key,@RequestBody Map<String,Object> body){
		String memberId = redisUtil.getData(key);
		User user = userRepositorySupport.findUserByUserId(memberId).get();
		user.setPassword(passwordEncoder.encode(body.get("password").toString()));
		userRepository.save(user);
		return new ResponseEntity(HttpStatus.OK);
	}

	@PostMapping("/duplicate-check-id")
	public ResponseEntity duplicateCheckId(@RequestBody Map<String,Object> body) {

		String userId  = body.get("id").toString();
		Optional<User> user = userRepositorySupport.findUserByUserId(userId);

		if (user.isPresent()) {
			return new ResponseEntity(HttpStatus.CONFLICT);
		}
		else {
			return new ResponseEntity(HttpStatus.OK);
		}
	}

	@PostMapping("/duplicate-check-email")
	public ResponseEntity duplicateCheckEmail(@RequestBody Map<String,Object> body) {

		String email  = body.get("email").toString();
		Optional<User> user = userRepository.findByEmail(email);


		if (user.isPresent()) {
			return new ResponseEntity(HttpStatus.CONFLICT);
		}
		else {
			return new ResponseEntity(HttpStatus.OK);
		}
	}

	@PostMapping("/duplicate-check-nickname")
	public ResponseEntity duplicateCheckNickname(@RequestBody Map<String,Object> body) {

		String nickname  = body.get("nickname").toString();
		Optional<User> user = userRepository.findByNickname(nickname);


		if (user.isPresent()) {
			return new ResponseEntity(HttpStatus.CONFLICT);
		}
		else {
			return new ResponseEntity(HttpStatus.OK);
		}
	}

	@GetMapping("/check-authority")
	public String checkAuthority(Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		if (user.getAuthority().equals("user")) {
			return "user";
		} else {
			return "admin";
		}
	}



}
