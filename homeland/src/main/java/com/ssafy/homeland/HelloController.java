package com.ssafy.homeland;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloController {

    @GetMapping("/call")
    public String call(){
        System.out.println("call");
        return "call.html";
    }
}
