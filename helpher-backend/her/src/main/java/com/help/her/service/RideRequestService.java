package com.help.her.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.help.her.model.RideRequest;
import com.help.her.repository.RideRequestRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RideRequestService {

    @Autowired
    private RideRequestRepository rideRequestRepository;

    public RideRequest saveRideRequest(RideRequest rideRequest) {
        rideRequest.setRequestDate(new Date());
        return rideRequestRepository.save(rideRequest);
    }

    public List<RideRequest> getAllRideRequests() {
        return rideRequestRepository.findAll();
    }

    public Optional<RideRequest> getRideRequestById(Long id) {
        return rideRequestRepository.findById(id);
    }

    public void deleteRideRequest(Long id) {
        rideRequestRepository.deleteById(id);
    }
}