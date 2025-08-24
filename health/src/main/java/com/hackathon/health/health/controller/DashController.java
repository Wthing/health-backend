package com.hackathon.health.health.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/dash")
public class DashController {
    @GetMapping("")
    public String index() {
        return "hey";
    }

    @GetMapping("/upload")
    public String upload() {
        return "upload";
    }

    @GetMapping("/results")
    public String results() {
        return "results";
    }
}
