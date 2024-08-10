package com.help.her.service;

import com.help.her.model.Room;
import com.help.her.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository repository;

    public Room saveBooking(Room booking) {
        return repository.save(booking);
    }

    public List<Room> getAllBookings() {
        return repository.findAll();
    }
}
