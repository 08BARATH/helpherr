package com.help.her.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.help.her.model.PickDropRequest;
import com.help.her.repository.PickDropRequestRepository;

import java.util.List;

@Service
public class PickDropRequestService {

    @Autowired
    private PickDropRequestRepository pickDropRequestRepository;

    public PickDropRequest savePickDropRequest(PickDropRequest request) {
        return pickDropRequestRepository.save(request);
    }

    public List<PickDropRequest> getAllRequests() {
        return pickDropRequestRepository.findAll();
    }
}
