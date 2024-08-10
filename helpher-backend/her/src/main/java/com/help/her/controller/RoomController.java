package com.help.her.controller;

import com.help.her.model.Room;
import com.help.her.repository.RoomRepository;
import com.help.her.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")

public class RoomController {

    @Autowired
    private RoomService service;

   

    @GetMapping
    public List<Room> getAllBookings() {
        return service.getAllBookings();
    }
       @Autowired
    private RoomRepository roomRepository;

    @PostMapping
    public Room createBooking(@RequestBody Room room) {
        return roomRepository.save(room);
    }
}
