package com.help.her.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.help.her.model.PickDropRequest;

public interface PickDropRequestRepository extends JpaRepository<PickDropRequest, Long> {
}
