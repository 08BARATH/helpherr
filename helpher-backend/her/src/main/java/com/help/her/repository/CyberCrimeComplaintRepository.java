package com.help.her.repository;

import com.help.her.model.CyberCrimeComplaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CyberCrimeComplaintRepository extends JpaRepository<CyberCrimeComplaint, Long> {
}


