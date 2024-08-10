package com.help.her.controller;

import com.help.her.model.CyberCrimeComplaint;
import com.help.her.service.CyberCrimeComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class CyberCrimeComplaintController {

    @Autowired
    private CyberCrimeComplaintService cyberCrimeComplaintService;

    @GetMapping
    public List<CyberCrimeComplaint> getAllComplaints() {
        return cyberCrimeComplaintService.getAllComplaints();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CyberCrimeComplaint> getComplaintById(@PathVariable Long id) {
        Optional<CyberCrimeComplaint> complaint = cyberCrimeComplaintService.getComplaintById(id);
        return complaint.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public CyberCrimeComplaint createComplaint(@RequestBody CyberCrimeComplaint complaint) {
        return cyberCrimeComplaintService.saveComplaint(complaint);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CyberCrimeComplaint> updateComplaint(@PathVariable Long id, @RequestBody CyberCrimeComplaint complaint) {
        if (!cyberCrimeComplaintService.getComplaintById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        complaint.setId(id);
        CyberCrimeComplaint updatedComplaint = cyberCrimeComplaintService.saveComplaint(complaint);
        return ResponseEntity.ok(updatedComplaint);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComplaint(@PathVariable Long id) {
        if (!cyberCrimeComplaintService.getComplaintById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        cyberCrimeComplaintService.deleteComplaint(id);
        return ResponseEntity.noContent().build();
    }
}

