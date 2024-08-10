// package com.help.her.service;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.help.her.model.Login;
// import com.help.her.repository.LoginRepository;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class LoginService {

//     @Autowired
//     private LoginRepository loginRepository;

//     public Login createLogin(Login login) {
//         return loginRepository.save(login);
//     }

//     public List<Login> getAllLogins() {
//         return loginRepository.findAll();
//     }


    

//     public Optional<Login> getLoginById(Long id) {
//         return loginRepository.findById(id);
//     }

//     public void deleteLogin(Long id) {
//         loginRepository.deleteById(id);
//     }

//     public Login findByEmail(String email) {
//         return loginRepository.findByEmail(email);
//     }

//     public Login findByPhonenumber(String phonenumber) {
//         return loginRepository.findByPhonenumber(phonenumber);
//     }

//     public boolean emailExists(String email) {
//         return loginRepository.findByEmail(email) != null;
//     }

//     public boolean phonenumberExists(String phonenumber) {
//         return loginRepository.findByPhonenumber(phonenumber) != null;
//     }
// }


package com.help.her.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.help.her.model.Login;
import com.help.her.repository.LoginRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private LoginRepository loginRepository;

    public Login createLogin(Login login) {
        return loginRepository.save(login);
    }

    public List<Login> getAllLogins() {
        return loginRepository.findAll();
    }

    public Optional<Login> getLoginById(Long id) {
        return loginRepository.findById(id);
    }

    public Login updateLogin(Long id, Login login) {
        login.setId(id);
        return loginRepository.save(login);
    }

    public void deleteLogin(Long id) {
        loginRepository.deleteById(id);
    }

    public Login findByEmail(String email) {
        return loginRepository.findByEmail(email);
    }

    public boolean emailExists(String email) {
        return loginRepository.findByEmail(email) != null;
    }
}
