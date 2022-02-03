package com.ssafy.homeland.api.service.member;

public interface EmailService {
    void sendMail(String to,String sub, String text);
}
