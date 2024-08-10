// package com.help.her.controller;

// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.help.her.model.Login;
// import com.help.her.service.LoginService;

// @RestController
// @RequestMapping("/login")
// @CrossOrigin(origins = "http://localhost:3000")
// public class LoginController {

//     @Autowired
//     private LoginService loginService;

//     private static final String ADMIN_EMAIL = "admin@helpher.com";
//     private static final String ADMIN_PASSWORD = "admin@helpher";

//     @PostMapping
//     public ResponseEntity<Map<String, Object>> createLogin(@RequestBody Login login) {
//         if (loginService.emailExists(login.getEmail())) {
//             Map<String, Object> response = new HashMap<>();
//             response.put("success", false);
//             response.put("message", "Email already exists");
//             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//         }

//         Login newLogin = loginService.createLogin(login);
//         Map<String, Object> response = new HashMap<>();
//         response.put("success", true);
//         response.put("message", "Registration successful");
//         response.put("login", newLogin);
//         return ResponseEntity.ok(response);
//     }

//     @GetMapping
//     public List<Login> getAllLogins() {
//         return loginService.getAllLogins();
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<Login> getLoginById(@PathVariable Long id) {
//         return loginService.getLoginById(id)
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteLogin(@PathVariable Long id) {
//         if (loginService.getLoginById(id).isPresent()) {
//             loginService.deleteLogin(id);
//             return ResponseEntity.ok().build();
//         } else {
//             return ResponseEntity.notFound().build();
//         }
//     }

//     @PostMapping("/check")
//     public ResponseEntity<Map<String, Object>> checkLogin(@RequestBody Login login) {
//         Map<String, Object> response = new HashMap<>();

//         // Check for admin credentials
//         if (ADMIN_EMAIL.equals(login.getEmail()) && ADMIN_PASSWORD.equals(login.getPassword())) {
//             response.put("success", true);
//             response.put("role", "admin");
//             return ResponseEntity.ok(response);
//         }
        

//         // Check for user credentials
//         Login existingLogin = loginService.findByEmail(login.getEmail());
//         if (existingLogin != null && existingLogin.getPassword().equals(login.getPassword())) {
//             response.put("success", true);
//             response.put("role", "user");
//             return ResponseEntity.ok(response);
//         } else {
//             response.put("success", false);
//             response.put("message", "Invalid credentials");
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//         }
//     }
// }
package com.help.her.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.help.her.model.Login;
import com.help.her.service.LoginService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private LoginService loginService;

    private static final String ADMIN_EMAIL = "admin@helpher.com";
    private static final String ADMIN_PASSWORD = "admin@helpher";

    @PostMapping
    public ResponseEntity<Map<String, Object>> createLogin(@RequestBody Login login) {
        if (loginService.emailExists(login.getEmail())) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Email already exists");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        Login newLogin = loginService.createLogin(login);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Registration successful");
        response.put("login", newLogin);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public List<Login> getAllLogins() {
        return loginService.getAllLogins();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Login> getLoginById(@PathVariable Long id) {
        return loginService.getLoginById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateLogin(@PathVariable Long id, @RequestBody Login login) {
        if (loginService.getLoginById(id).isPresent()) {
            Login updatedLogin = loginService.updateLogin(id, login);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("login", updatedLogin);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLogin(@PathVariable Long id) {
        if (loginService.getLoginById(id).isPresent()) {
            loginService.deleteLogin(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/check")
    public ResponseEntity<Map<String, Object>> checkLogin(@RequestBody Login login) {
        Map<String, Object> response = new HashMap<>();

        if (ADMIN_EMAIL.equals(login.getEmail()) && ADMIN_PASSWORD.equals(login.getPassword())) {
            response.put("success", true);
            response.put("role", "admin");
            return ResponseEntity.ok(response);
        }

        Login existingLogin = loginService.findByEmail(login.getEmail());
        if (existingLogin != null && existingLogin.getPassword().equals(login.getPassword())) {
            response.put("success", true);
            response.put("role", "user");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
