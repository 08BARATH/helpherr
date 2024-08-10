package com.help.her.service;

import com.help.her.model.CyberCrimeComplaint;
import com.help.her.repository.CyberCrimeComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CyberCrimeComplaintService {

    @Autowired
    private CyberCrimeComplaintRepository cyberCrimeComplaintRepository;

    public List<CyberCrimeComplaint> getAllComplaints() {
        return cyberCrimeComplaintRepository.findAll();
    }

    public Optional<CyberCrimeComplaint> getComplaintById(Long id) {
        return cyberCrimeComplaintRepository.findById(id);
    }

    public CyberCrimeComplaint saveComplaint(CyberCrimeComplaint complaint) {
        return cyberCrimeComplaintRepository.save(complaint);
    }

    public void deleteComplaint(Long id) {
        cyberCrimeComplaintRepository.deleteById(id);
    }
}

