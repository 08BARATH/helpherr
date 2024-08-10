package com.help.her.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class PickDropRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pickupLocation;
    private String destinationLocation;
    private String userId;
    private Date requestDate;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }
    public String getDestinationLocation() { return destinationLocation; }
    public void setDestinationLocation(String destinationLocation) { this.destinationLocation = destinationLocation; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public Date getRequestDate() { return requestDate; }
    public void setRequestDate(Date requestDate) { this.requestDate = requestDate; }
}
