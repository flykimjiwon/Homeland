package com.ssafy.homeland.api.controller.notice;
import com.ssafy.homeland.api.request.notice.NoticePostReq;
import com.ssafy.homeland.api.response.notice.NoticeListRes;
import com.ssafy.homeland.api.response.notice.NoticeRes;
import com.ssafy.homeland.api.service.member.UserService;
import com.ssafy.homeland.common.auth.SsafyUserDetails;
import com.ssafy.homeland.db.entity.Notice;
import com.ssafy.homeland.db.entity.User;
import com.ssafy.homeland.db.repository.NoticeRepository;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/v1/notice")
@Api(value = "공지사항 API", tags = {"Notice"})
public class NoticeController {


    @Autowired
    NoticeRepository noticeRepository;

    @Autowired
    UserService userService;

    @ApiOperation(value = "공지사항 리스트 조회", notes = "공지사항 리스트를 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping
    public ResponseEntity list() {
        List<Notice> list = noticeRepository.findAll();
        List<NoticeListRes> noticeList = new ArrayList<>();

        for (Notice entity : list) {
            noticeList.add(new NoticeListRes(entity));
        }
        return new ResponseEntity<>(noticeList,HttpStatus.OK);

    }


    @ApiOperation(value = "특정 공지사항 조회", notes = "특정 공지사항을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name="noticeId", value = "공지사항 seq", required = true, dataType = "Long")
    @GetMapping("/{noticeId}")
    public ResponseEntity notice(@PathVariable Long noticeId) {
        Optional<Notice> option = noticeRepository.findById(noticeId);
        if (!option.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        Notice notice = option.get();
        NoticeRes noticeRes = new NoticeRes(notice);
        return new ResponseEntity<>(noticeRes,HttpStatus.OK);

    }


    @ApiOperation(value = "특정 공지사항 삭제", notes = "user 중 admin 권한을 가진 사람이 특정 공지사항을 삭제한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name="noticeId", value = "공지사항 seq", required = true, dataType = "Long")
    @DeleteMapping("/{noticeId}")
    public ResponseEntity delete(@ApiIgnore Authentication authentication, @PathVariable Long noticeId) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        if (user.getAuthority().equals("user")) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        noticeRepository.deleteById(noticeId);
        return new ResponseEntity(HttpStatus.OK);
    }


    @ApiOperation(value = "공지사항 작성", notes = "user 중 admin 권한을 가진 사람이 공지사항을 작성한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PostMapping
    public ResponseEntity post(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value="공지사항 정보", required = true) NoticePostReq noticePostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        if (user.getAuthority().equals("user")) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        noticeRepository.save(Notice.builder()
                .title(noticePostReq.getTitle())
                .content(noticePostReq.getContent())
                .createdAt(LocalDateTime.now())
                .updateAt(LocalDateTime.now())
                .build());
        return new ResponseEntity(HttpStatus.OK);
    }


    @ApiOperation(value = "공지사항 수정", notes = "user 중 admin 권한을 가진 사람이 공지사항을 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @ApiImplicitParam(name="noticeId", value = "공지사항 seq", required = true)
    @PutMapping("/{noticeId}")
    public ResponseEntity update(@ApiIgnore Authentication authentication,@PathVariable Long noticeId, @RequestBody  @ApiParam(value="공지사항 수정 정보", required = true) NoticePostReq noticePostReq){

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        if (user.getAuthority().equals("user")) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        var option = noticeRepository.findById(noticeId);
        if(!option.isPresent()){
            return null;
        }
        Notice notice = option.get();
        notice.setTitle(noticePostReq.getTitle());
        notice.setContent(noticePostReq.getContent());
        notice.setUpdateAt(LocalDateTime.now());
        noticeRepository.save(notice);
        return new ResponseEntity(HttpStatus.OK);
    }




}
