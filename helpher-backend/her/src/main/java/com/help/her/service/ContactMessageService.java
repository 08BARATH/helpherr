package com.help.her.service;

import com.help.her.model.ContactMessage;
import com.help.her.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ContactMessageService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    public ContactMessage saveContactMessage(ContactMessage contactMessage) {
        return contactMessageRepository.save(contactMessage);
    }
}
