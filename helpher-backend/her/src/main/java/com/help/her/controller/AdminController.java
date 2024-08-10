package com.help.her.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.help.her.model.Login;
import com.help.her.service.LoginService;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private LoginService loginService;

    @GetMapping("/users")
    public ResponseEntity<List<Login>> getAllUsers() {
        List<Login> users = loginService.getAllLogins();
        return ResponseEntity.ok(users);
    }
}
