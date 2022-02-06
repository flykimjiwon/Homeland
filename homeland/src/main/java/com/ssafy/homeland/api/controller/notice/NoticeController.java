package com.ssafy.homeland.api.controller.notice;
import com.ssafy.homeland.api.response.notice.NoticeListRes;
import com.ssafy.homeland.api.response.notice.NoticeRes;
import com.ssafy.homeland.api.service.member.UserService;
import com.ssafy.homeland.common.auth.SsafyUserDetails;
import com.ssafy.homeland.db.entity.Notice;
import com.ssafy.homeland.db.entity.User;
import com.ssafy.homeland.db.repository.NoticeRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/v1/notice")
public class NoticeController {


    @Autowired
    NoticeRepository noticeRepository;

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity list() {
        List<Notice> list = noticeRepository.findAll();
        List<NoticeListRes> noticeList = new ArrayList<>();

        for (Notice entity : list) {
            noticeList.add(new NoticeListRes(entity));
        }
        return new ResponseEntity<>(noticeList,HttpStatus.OK);

    }


    @GetMapping("/{noticeId}")
    public ResponseEntity notice(@PathVariable Long noticeId) {
        Optional<Notice> option = noticeRepository.findById(noticeId);
        if (!option.isPresent()) {
            return new ResponseEntity<>(null,HttpStatus.OK);
        }
        Notice notice = option.get();
        NoticeRes noticeRes = new NoticeRes(notice);
        return new ResponseEntity<>(noticeRes,HttpStatus.OK);

    }

    @DeleteMapping("/{noticeId}")
    public ResponseEntity delete(Authentication authentication, @PathVariable Long noticeId) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        if (user.getAuthority().equals("user")) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        noticeRepository.deleteById(noticeId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity post(Authentication authentication, @RequestBody Map<String, Object> body) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        //System.out.println(user.getAuthority());
        if (user.getAuthority().equals("user")) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        noticeRepository.save(Notice.builder()
                .title(body.get("title").toString())
                .content(body.get("content").toString())
                .createdAt(LocalDateTime.now())
                .updateAt(LocalDateTime.now())
                .build());
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/{noticeId}")
    public ResponseEntity update(Authentication authentication,@PathVariable Long noticeId, @RequestBody Map<String,Object> body){

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
        notice.setTitle(body.get("title").toString());
        notice.setContent(body.get("content").toString());
        notice.setUpdateAt(LocalDateTime.now());
        noticeRepository.save(notice);
        return new ResponseEntity(HttpStatus.OK);
    }




}
