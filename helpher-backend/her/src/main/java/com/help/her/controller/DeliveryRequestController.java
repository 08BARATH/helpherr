package com.help.her.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.help.her.model.DeliveryRequest;
import com.help.her.service.DeliveryRequestService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/delivery-requests")
@CrossOrigin(origins = "http://localhost:3000")
public class DeliveryRequestController {

    @Autowired
    private DeliveryRequestService deliveryRequestService;

    @PostMapping("/request")
    public ResponseEntity<?> requestDelivery(@RequestBody DeliveryRequest deliveryRequest) {
        try {
            DeliveryRequest newRequest = deliveryRequestService.saveDeliveryRequest(deliveryRequest);
            return ResponseEntity.ok(newRequest);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllDeliveryRequests() {
        try {
            List<DeliveryRequest> requestList = deliveryRequestService.getAllDeliveryRequests();
            return ResponseEntity.ok(requestList);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDeliveryRequest(@PathVariable Long id, @RequestBody DeliveryRequest deliveryRequest) {
        try {
            Optional<DeliveryRequest> existingRequest = deliveryRequestService.getDeliveryRequestById(id);
            if (existingRequest.isPresent()) {
                DeliveryRequest updatedRequest = deliveryRequestService.updateDeliveryRequest(id, deliveryRequest);
                return ResponseEntity.ok(updatedRequest);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDeliveryRequest(@PathVariable Long id) {
        try {
            deliveryRequestService.deleteDeliveryRequest(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}