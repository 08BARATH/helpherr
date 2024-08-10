package com.help.her.controller;

import com.help.her.model.ContactMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ContactController {

    @PostMapping("/contact")
    public ResponseEntity<Object> submitContactMessage(@RequestBody ContactMessage contactMessage) {
        // Log or process the contactMessage object as needed
        System.out.println("Received contact message: " + contactMessage);
        
        // Create a response object
        Response response = new Response("Contact message received");

        // Return a JSON response
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    private static class Response {
        private String message;

        public Response(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
