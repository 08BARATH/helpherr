package com.help.her.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.help.her.model.PickDropRequest;
import com.help.her.service.PickDropRequestService;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api/pick-drop-requests")
public class PickDropRequestController {

    @Autowired
    private PickDropRequestService pickDropRequestService;

    @PostMapping("/request")
    public ResponseEntity<PickDropRequest> createPickDropRequest(@RequestBody PickDropRequest request) {
        request.setRequestDate(new Date());
        PickDropRequest savedRequest = pickDropRequestService.savePickDropRequest(request);
        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PickDropRequest>> getAllRequests() {
        List<PickDropRequest> requests = pickDropRequestService.getAllRequests();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }
}
