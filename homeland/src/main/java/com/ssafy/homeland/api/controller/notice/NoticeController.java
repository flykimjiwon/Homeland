package com.ssafy.homeland.api.controller.notice;
import com.ssafy.homeland.api.request.notice.NoticePostReq;
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
@RequestMapping("/api/v1/notice")
public class NoticeController {


    @Autowired
    NoticeRepository noticeRepository;

    @Autowired
    UserService userService;

    @GetMapping
    public List<Map<String, Object>> list() {
        List<Map<String, Object>> result = new ArrayList<>();
        noticeRepository.findAll().forEach(noticeList -> {
            Map<String, Object> obj = new HashMap<>();
            obj.put("id", noticeList.getId());
            obj.put("title", noticeList.getTitle());
            obj.put("createdAt", noticeList.getCreatedAt());
            obj.put("updatedAt", noticeList.getUpdateAt());
            result.add(obj);
        });
        return result;
    }

    @GetMapping("/{noticeId}")
    public Map<String, Object> notice(@PathVariable Long noticeId) {
        var option = noticeRepository.findById(noticeId);
        if (!option.isPresent()) {
            return null;
        }
        Notice notice = option.get();
        Map<String, Object> obj = new HashMap<>();
        obj.put("id", notice.getId());
        obj.put("title", notice.getTitle());
        obj.put("content", notice.getContent());
        obj.put("createdAt", notice.getCreatedAt());
        obj.put("updatedAt", notice.getUpdateAt());
        return obj;
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


//    @PostMapping()
//    public Notice createNotice(@RequestBody NoticePostReq noticeInfo) {
//        Notice notice = noticeService.createNotice(noticeInfo);
//        return notice;
//    }
//
//    @GetMapping()
//    public List<Object[]> notices() {
//        List<Object[]> notices = noticeRepository.findNoticeList();
//        return notices;
//    } 
//
//    @GetMapping("/{noticeId}")
//    public Optional<Notice> notice(@PathVariable Long noticeId) {
//        Optional<Notice> notice = noticeRepository.findById(noticeId);
//        return notice;
//    }
//
//    @DeleteMapping("/{noticeId}")
//    public Long delete(@PathVariable Long noticeId){
//        return noticeService.deleteNotice(noticeId);
//    }

//    @PutMapping("/{noticeId}")
//    public Long update(@PathVariable Long noticeId, @RequestBody NoticePostReq noticeInfo) {
//        return noticeService.update(noticeId, noticeInfo);
//    }



}
