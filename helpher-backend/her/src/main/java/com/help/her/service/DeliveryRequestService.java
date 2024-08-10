package com.help.her.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.help.her.model.DeliveryRequest;
import com.help.her.repository.DeliveryRequestRepository;

import java.util.List;
import java.util.Optional;

@Service
public class DeliveryRequestService {

    @Autowired
    private DeliveryRequestRepository deliveryRequestRepository;

    public DeliveryRequest saveDeliveryRequest(DeliveryRequest deliveryRequest) {
        return deliveryRequestRepository.save(deliveryRequest);
    }

    public List<DeliveryRequest> getAllDeliveryRequests() {
        return deliveryRequestRepository.findAll();
    }

    public Optional<DeliveryRequest> getDeliveryRequestById(Long id) {
        return deliveryRequestRepository.findById(id);
    }

    public DeliveryRequest updateDeliveryRequest(Long id, DeliveryRequest deliveryRequest) {
        deliveryRequest.setId(id);
        return deliveryRequestRepository.save(deliveryRequest);
    }

    public void deleteDeliveryRequest(Long id) {
        deliveryRequestRepository.deleteById(id);
    }
}