package com.example.productapi.controller;

import com.example.productapi.dto.UserDTO;
import com.example.productapi.dto.UserPatchDTO;
import com.example.productapi.model.User;
import com.example.productapi.repository.UserRepository;
import com.example.productapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/streak/api/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/get")
    public List<UserDTO> getAllUsers() {
        return userService.getUsers();
    }

    @GetMapping("/get/{id}")
    public UserDTO getUserById(@PathVariable long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/get/admins")
    public List<UserDTO> getAllAdmins() {return userService.getUserByType_ADMIN();}

    @GetMapping("get/users")
    public List<UserDTO> getAllUsersByUserType_USER() {
        return userService.getUserByType_USER();
    }

    @GetMapping("/get/ceos")
    public List<UserDTO> getAllUsersByUserType_CEO() {
        return userService.getUserByUserType_CEO();
    }

    @GetMapping("/get/couriers")
    public List<UserDTO> getAllUsersByUserType_COURIER() {
        return userService.getUserByUserType_COURIER();
    }

    @PostMapping("/add")
    public ResponseEntity<UserDTO> addUser(@RequestBody UserDTO userDTO) {
        UserDTO created = userService.createUser(userDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /*@PutMapping("/update/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable long id, @RequestBody UserDTO userDTO) {
        UserDTO updated = userService.updateUser(id, userDTO);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }
    */

    @PatchMapping("/update/{id}")
    public ResponseEntity<User> patchUser(@PathVariable Long id, @RequestBody UserPatchDTO patchDTO) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();

        if (patchDTO.getFirstName() != null) {
            user.setFirstName(patchDTO.getFirstName());
        }
        if (patchDTO.getLastName() != null) {
            user.setLastName(patchDTO.getLastName());
        }
        if (patchDTO.getEmail() != null) {
            user.setEmail(patchDTO.getEmail());
        }
        if (patchDTO.getPassword() != null) {
            user.setPassword(patchDTO.getPassword());
        }
        if (patchDTO.getPhone() != null) {
            user.setPhone(patchDTO.getPhone());
        }
        if (patchDTO.getAddress() != null) {
            user.setAddress(patchDTO.getAddress());
        }

        userRepository.save(user);

        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        userService.deleteUserById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete/ceo/{id}")
    public ResponseEntity<Void> deleteCeo(@PathVariable long id) {
        userService.deleteCEOById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
